Below is a manually–compiled, non-exhaustive list of the most commonly encountered **standard AJAX endpoints** in XenForo 2.3, grouped by controller prefix. Unfortunately there’s no single published “master list”—you must refer to the PHP controller methods in `src/XF/Pub/Controller` (e.g. **MiscController.php**, **AccountController.php**, **ConversationController.php**, etc.) to see every action([XenForo][1]).

These endpoints all use the pattern:

```
https://<forum-base-url>/index.php?<prefix>/<action>
  + JSON-only flags (`_xfResponseType=json`, `_xfWithData=1`)
  + CSRF token (`_xfToken=…`)
```

## 1. `index.php?misc/...` (MiscController actions)

Handles in-page UI interactions like previews, drafts, attachments, watches, reactions, notifications, style switches, etc.

| Endpoint                 | Description                              | Controller Method                       |
| ------------------------ | ---------------------------------------- | --------------------------------------- |
| `misc/style-variation`   | Toggle light/dark (style) variations     | `actionStyleVariation()` ([XenForo][2]) |
| `misc/post-preview`      | Live preview of a post before submitting | `actionPostPreview()` ([XenForo][3])    |
| `misc/thread-preview`    | Live preview of a thread start           | `actionThreadPreview()` ([XenForo][4])  |
| `misc/editor-save-draft` | Manually save editor draft               | `actionEditorSaveDraft()`               |
| `misc/editor-load-draft` | Load previously saved draft              | `actionEditorLoadDraft()`               |
| `misc/attachment-upload` | Upload a file attachment in-editor       | `actionAttachmentUpload()`              |
| `misc/attachment-delete` | Remove an uploaded attachment            | `actionAttachmentDelete()`              |
| `misc/watch-toggle`      | Subscribe/unsubscribe a thread           | `actionWatchToggle()`                   |
| `misc/bookmark-toggle`   | Bookmark/unbookmark a post               | `actionBookmarkToggle()`                |
| `misc/mark-forum-read`   | Mark entire forum as read                | `actionMarkForumRead()`                 |
| `misc/mark-thread-read`  | Mark a single thread as read             | `actionMarkThreadRead()`                |
| `misc/mark-alert-read`   | Mark alerts as read                      | `actionMarkAlertRead()`                 |
| `misc/reaction-toggle`   | Add/remove a reaction (like) on a post   | `actionReactionToggle()`                |
| `misc/notifications`     | Fetch new notifications count & list     | `actionNotifications()`                 |
| `misc/alerts-mark-read`  | Mark alerts read via AJAX                | `actionAlertsMarkRead()`                |

> **Tip:** You can confirm any of these by inspecting DevTools → Network (filter XHR) while interacting with the UI (e.g. toggling watches, posting, switching styles)([XenForo][3]).

---

## 2. `index.php?account/...` (AccountController actions)

Handles login, logout, registration, and connected-account OAuth callbacks.

| Endpoint                   | Description                       | Controller Method              |
| -------------------------- | --------------------------------- | ------------------------------ |
| `account/login`            | AJAX-based login form submission  | `actionLogin()` ([XenForo][1]) |
| `account/logout`           | AJAX logout trigger               | `actionLogout()`               |
| `account/register`         | AJAX registration form submission | `actionRegister()`             |
| `account/facebook-connect` | OAuth callback for Facebook login | `actionFacebookConnect()`      |
| `account/google-connect`   | OAuth callback for Google login   | `actionGoogleConnect()`        |

---

## 3. `index.php?conversations/...` (ConversationController actions)

In-forum private messaging endpoints.

| Endpoint              | Description                       | Controller Method            |
| --------------------- | --------------------------------- | ---------------------------- |
| `conversations/add`   | Start a new conversation          | `actionAdd()` ([XenForo][1]) |
| `conversations/reply` | Reply to an existing conversation | `actionReply()`              |

---

## 4. `index.php?search/...` (SearchController actions)

Live search/autocomplete features.

| Endpoint              | Description                          | Controller Method                     |
| --------------------- | ------------------------------------ | ------------------------------------- |
| `search/autocomplete` | Auto-complete users, threads, forums | `actionAutocomplete()` ([XenForo][5]) |

---

## 5. `index.php?inline-mod/...` (InlineModController actions)

Inline moderation operations (requires moderator permissions).

| Endpoint                    | Description                        | Example Controller  |
| --------------------------- | ---------------------------------- | ------------------- |
| `inline-mod/post/delete`    | Delete a post                      | `InlineMod\Post`    |
| `inline-mod/post/censor`    | Censor a post                      | `InlineMod\Post`    |
| `inline-mod/message/remove` | Remove a conversation message      | `InlineMod\Message` |
| …                           | … and many more inline-mod actions |                     |

> **Discover these by** examining `src/XF/Pub/Controller/InlineMod/*.php` and matching each `actionXxx()` to `inline-mod/xxx`([XenForo][1]).

---

### How to find *all* of them on your installation

1. **Browse the PHP code**

   * Look in `src/XF/Pub/Controller/MiscController.php`, `AccountController.php`, `ConversationController.php`, `SearchController.php`, and every file under `InlineMod/` for methods named `actionXxx()`. Each corresponds to an AJAX endpoint in `index.php?<prefix>/xxx`([XenForo][1]).

2. **DevTools → Network (XHR)**

   * As you interact with every piece of the UI (posting, previewing, drafting, moderating), note the AJAX calls that go out. Those are exactly the endpoints you can script([XenForo][2]).

3. **Admin CP – Routes → Misc / Account / Conversations / Search**

   * The Routes viewer in the Admin Control Panel highlights all registered “public” routes, including these AJAX prefixes.

---

**Sources & notes:**

* Controller-to-URL routing basics: Developer Docs ([XenForo][1])
* Examples of `misc/style-variation` and other `misc/…` endpoints: Community threads ([XenForo][2], [XenForo][3])
* Search/autocomplete endpoint: Community Q\&A ([XenForo][5])
* Conversations and Account endpoints: inferred from controller conventions ([XenForo][1])

Because XenForo does not publish a single centralized list, the definitive source remains the code itself. Enjoy wiring these up in your extension!

[1]: https://xenforo.com/docs/dev/controller-basics/?utm_source=chatgpt.com "Controller basics | Developer Documentation - XenForo"
[2]: https://xenforo.com/community/threads/3k-blocked-due-to-other-4xx-issue-in-google-search-console.224863/page-2?utm_source=chatgpt.com "XF 2.3 - 3k+ 'Blocked due to other 4xx issue' in Google Search ..."
[3]: https://xenforo.com/community/threads/xenforo-ajax-tutorial.8091/page-3?utm_source=chatgpt.com "XenForo AJAX Tutorial | Page 3"
[4]: https://xenforo.com/community/threads/use-an-action-from-a-different-controller-and-receive-data.220906/?utm_source=chatgpt.com "XF 2.3 - Use an action from a different controller and receive data"
[5]: https://xenforo.com/community/threads/call-xf-with-the-right-language-from-an-extern-page.120809/?utm_source=chatgpt.com "Call XF with the right language from an extern page - XenForo"


_xfResponseType=json
