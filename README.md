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

### Milestone 2: multiuser app
- [ ] 


## Learnings/Gotchas
1. Use ThunkDispatch to type your AppDispatch (for use with hooks) to get type safefy in dispatch functions (https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk)
