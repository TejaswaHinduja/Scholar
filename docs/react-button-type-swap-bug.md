# Bug: Edit button was silently submitting the profile form

## Symptom

On the profile page, clicking **Edit** made the fields editable for a few
seconds, then they snapped back to disabled on their own.

## Root cause

The header conditionally renders one of two buttons in the same position:

```tsx
{editing ? (
  <Button type="submit">Save</Button>
) : (
  <Button type="button" variant="outline" onClick={() => setEditing(true)}>
    Edit
  </Button>
)}
```

Three things combine into the bug:

1. **React flushes click-handler state updates synchronously.** When `onClick`
   calls `setEditing(true)`, React re-renders *before* the browser finishes
   processing the click event.

2. **React reuses the DOM node.** Both branches render a `<Button>` at the same
   position in the tree, so React doesn't replace the `<button>` element — it
   mutates its attributes in place. The clicked element's `type` changes from
   `"button"` to `"submit"` mid-click.

3. **The browser decides the click's default action last.** After all event
   handlers run, the browser looks at the clicked element to decide what the
   default action is. By then the element is `type="submit"` — so the click
   submits the form.

From there the timeline explains the "few seconds":

```text
click Edit
  → setEditing(true)            fields become editable
  → button morphs into type="submit"
  → browser submits the form
  → handleSubmit(onSubmit)      PUT /api/main/user (takes a few seconds)
  → response arrives
  → setEditing(false)           fields snap back to disabled
```

## Fix

Call `e.preventDefault()` in the Edit button's click handler. This cancels the
click's default action entirely, so even though the element becomes a submit
button mid-click, no form submission happens:

```tsx
<Button
  type="button"
  variant="outline"
  onClick={(e) => {
    e.preventDefault()
    setEditing(true)
  }}
>
  Edit
</Button>
```

## Alternative fix

Give the two buttons distinct `key`s so React unmounts one DOM node and mounts
a fresh one instead of mutating the same element. A detached node can't submit
the form:

```tsx
{editing ? (
  <Button key="save" type="submit">Save</Button>
) : (
  <Button key="edit" type="button" onClick={() => setEditing(true)}>
    Edit
  </Button>
)}
```

## Takeaway

Whenever a click handler swaps the clicked button between `type="button"` and
`type="submit"` inside a `<form>`, either `preventDefault()` the click or key
the two buttons so React doesn't reuse the DOM node.
