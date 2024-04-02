## Technical WTBD
### Milestone 1: single user app
- [ ] a modal that allows text to be entered and a button to be submit text, accepts prompt/placeholder text and onSubmit as callbacks (can be reused for card creation, just different prompt and callback)
- [ ] use above component for name entry
- [ ] card list view
	- [ ] accepts list of cards as props
	- [ ] displays cards, allows scrolling
	- [ ] allows cards to be deleted
	- [ ] allows cards to be dragged to reorder
	- [ ] onReorder, onCreate, onDelete callbacks
	- [ ] sticky button at bottom for create card action
	- [ ] modal for entering name if not present
	- [ ] modal for creating card
- [ ] card list route
	- [ ] loads cards for room, resolved from url
- [ ] localStorage
	- [ ] stores username
	- [ ] stores cards for room?

### Milestone 2: Use trimerge
- [ ] make trimerge single source of truth
- [ ] create patches/commits inside of reducer
- [ ] persist locally
- [ ] reconstruct latest state on load

### Milestone 3: multiuser app
- [ ] subscribe to pubnub for room on load
- [ ] broadcast commits to pub nub
- [ ] subscribe to commits from pub nub, persist locally, update local state using trimerge


## Learnings/Gotchas
1. Use ThunkDispatch to type your AppDispatch (for use with hooks) to get type safefy in dispatch functions (https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk)
2. Sticky footer must be *sibling* not *child* of element with min-height: 100vh;


## Stretch goals
- [ ] use https://react-dnd.github.io/react-dnd to make notes draggable