import { CannotMerge, combineMergers, trimergeEquality, trimergeObject, trimergeString } from "trimerge";
import { ClientPresenceRef, Commit, LocalStore, MergeAllBranchesFn, MergeDocFn, TrimergeClient, makeMergeAllBranchesFn } from "trimerge-sync";
import { computeRef } from "trimerge-sync-hash";
import { Delta, create } from "jsondiffpatch";
import { produce } from "immer";

// Q: what jdp options if any are required for trimerge?
const jdp = create();

const diff = <T extends any>(left: T, right: T): Delta | undefined => jdp.diff(left, right);

export function patch<T>(base: T, delta: Delta | undefined): T {
  if (delta === undefined) {
    return base;
  }
  return produce(base, (draft: any) => jdp.patch(draft, delta));
}

// TODO: experiment with my own number merger
const maxNumberMerger = (orig: any, left: any, right: any): number | typeof CannotMerge =>
  typeof orig === "number" &&
  typeof left === "number" &&
  typeof right === "number" ?
    Math.max(Math.max(orig, left), right) : CannotMerge;

const myMergers = combineMergers(
  trimergeEquality,
  trimergeObject,
  trimergeString,
  maxNumberMerger
)

const merge: MergeDocFn<any, string> = (base, left, right) => ({
  doc: myMergers(base?.doc, left?.doc, right?.doc),
  metadata: "marcus-metadata"
});

// just jk'ing, this is essentially shuffling them
const mergeAllBranches: MergeAllBranchesFn<any, any> = makeMergeAllBranchesFn((a, b) => -1, merge);

class NotesLocalStore implements LocalStore<Delta, any, any>  {
  isRemoteLeader: boolean;

  constructor(private docID: string) {
    this.isRemoteLeader = true;
  }

  update(
    commits: readonly Commit<Delta, any>[],
    presence: ClientPresenceRef<any> | undefined
  ): Promise<void> {
    const index = this.getCommitIndex();
    commits.forEach(c => {
      index.push(c.ref);
      window.localStorage.setItem(c.ref, JSON.stringify(c));
    });
    window.localStorage.setItem(this.commitIndexKey(), JSON.stringify(index));

    return new Promise(res => {
      console.log("Update has been called", { commits });
      res();
    })
  }

  shutdown() {
    console.log("Local store is being shut down");
  }

  hydrate(): Commit<any>[] {
    const index = this.getCommitIndex();
    const commits = index.map(ref => this.getCommit(ref));
    console.log("[LocalStore] loaded commits", commits);

    return commits;
  }

  private getCommit(ref: string) {
    const str = window.localStorage.getItem(ref);
    if (!str) {
      throw new Error(`Assertion error: store for ${this.docID} unable to find commit "${ref}"`);
    }

    return JSON.parse(str);
  }

  private getCommitIndex(): string[] {
    const indexKey = this.commitIndexKey();
    const indexStr = window.localStorage.getItem(indexKey);
    const index = indexStr ? JSON.parse(indexStr) : [];

    return index;
  }

  private commitIndexKey(): string {
    return `commit_index:${this.docID}`;
  }
};

const defaultDoc = {};

const cache: Record<string, TrimergeClient<any, any, any, any, any>> = {};

export const getClient = (docID: string) => {
  if (cache[docID]) return cache[docID];

  const localStore = new NotesLocalStore(docID);

  const client = new TrimergeClient("marcus", "local", {
    differ: {
      diff,
      patch: (priorOrNextDelta: any, delta: any) => patch(priorOrNextDelta, delta) ?? defaultDoc
    },
    mergeAllBranches,
    computeRef,
    getLocalStore: () => localStore
  });

  const storedCommits = localStore.hydrate();
  storedCommits.forEach(commit => client.updateDoc(commit.delta, {}, {}))

  cache[docID] = client;

  return client;
}

