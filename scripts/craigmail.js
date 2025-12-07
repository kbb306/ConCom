// scripts/craigmail.js

// Where the JSON lives (see next section)
const CRAIGMAIL_DATA_URL = "data/craigmail.json";

let allEmails = [];
let currentFolder = "inbox";
let selectedId = null;

document.addEventListener("DOMContentLoaded", () => {
    const listEl   = document.getElementById("craigmail-list");
    const detailEl = document.getElementById("craigmail-detail");
    const searchEl = document.getElementById("craigmail-search");
    const folderEls = Array.from(document.querySelectorAll(".craigmail-folders li"));

    // Folder switching
    folderEls.forEach(li => {
        li.addEventListener("click", () => {
            folderEls.forEach(f => f.classList.remove("craigmail-active-folder"));
            li.classList.add("craigmail-active-folder");

            currentFolder = li.getAttribute("data-folder") || "inbox";
            selectedId = null;
            renderList(listEl, detailEl, searchEl.value.trim());
            renderEmptyDetail(detailEl);
        });
    });

    // Search
    searchEl.addEventListener("input", () => {
        renderList(listEl, detailEl, searchEl.value.trim());
    });

    // Load JSON
    fetch(CRAIGMAIL_DATA_URL)
        .then(resp => {
            if (!resp.ok) throw new Error("Failed to load data");
            return resp.json();
        })
        .then(data => {
            allEmails = Array.isArray(data) ? data : [];
            renderList(listEl, detailEl, searchEl.value.trim());
            if (allEmails.length) {
                // Auto-select first visible message
                const first = getFilteredEmails(searchEl.value.trim())[0];
                if (first) {
                    selectedId = first.id;
                    renderList(listEl, detailEl, searchEl.value.trim());
                    renderDetail(detailEl, first);
                }
            }
        })
        .catch(err => {
            console.error(err);
            listEl.innerHTML = `<p class="craigmail-empty">Unable to load messages.</p>`;
        });
});

function getFilteredEmails(searchTerm) {
    const term = (searchTerm || "").toLowerCase();

    return allEmails
        .filter(msg => (msg.folder || "inbox") === currentFolder)
        .filter(msg => {
            if (!term) return true;
            const subject = (msg.subject || "").toLowerCase();
            const body    = (msg.body || "").toLowerCase();
            const from    = (msg.from || "").toLowerCase();
            return (
                subject.includes(term) ||
                body.includes(term) ||
                from.includes(term)
            );
        })
        .sort((a, b) => {
            // Newest first by timestamp
            const da = new Date(a.timestamp || 0).getTime();
            const db = new Date(b.timestamp || 0).getTime();
            return db - da;
        });
}

function renderList(listEl, detailEl, searchTerm) {
    const emails = getFilteredEmails(searchTerm);

    if (!emails.length) {
        listEl.innerHTML = `<p class="craigmail-empty">No messages in this folder.</p>`;
        return;
    }

    listEl.innerHTML = "";
    emails.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("craigmail-message");
        if (msg.id === selectedId) {
            div.classList.add("craigmail-selected");
        }

        const from = document.createElement("div");
        from.classList.add("craigmail-message-from");
        from.textContent = msg.from || "(unknown sender)";

        const subject = document.createElement("div");
        subject.classList.add("craigmail-message-subject");
        subject.textContent = msg.subject || "(no subject)";

        const preview = document.createElement("div");
        preview.classList.add("craigmail-message-preview");
        preview.textContent = msg.preview || (msg.body || "").slice(0, 80);

        const meta = document.createElement("div");
        meta.classList.add("craigmail-message-meta");
        meta.textContent = formatTimestamp(msg.timestamp);

        div.appendChild(from);
        div.appendChild(subject);
        div.appendChild(preview);
        div.appendChild(meta);

        div.addEventListener("click", () => {
            selectedId = msg.id;
            renderList(listEl, detailEl, searchTerm);
            renderDetail(detailEl, msg);
        });

        listEl.appendChild(div);
    });
}

function renderDetail(detailEl, msg) {
    if (!msg) {
        renderEmptyDetail(detailEl);
        return;
    }

    const subject = msg.subject || "(no subject)";
    const from    = msg.from || "(unknown sender)";
    const to      = msg.to || "craigferson@concomcompany.com";
    const ts      = formatTimestamp(msg.timestamp);

    detailEl.innerHTML = `
        <div class="craigmail-detail-header">
            <h2 class="craigmail-detail-subject">${escapeHtml(subject)}</h2>
            <div class="craigmail-detail-meta">
                <div><strong>From:</strong> ${escapeHtml(from)}</div>
                <div><strong>To:</strong> ${escapeHtml(to)}</div>
                <div><strong>Date:</strong> ${escapeHtml(ts)}</div>
            </div>
        </div>
        <div class="craigmail-detail-body"></div>
    `;

    // Insert body as plain text, preserving line breaks
    const bodyEl = detailEl.querySelector(".craigmail-detail-body");

    if (msg.bodyFile) {
    fetch(msg.bodyFile)
        .then(r => r.text())
        .then(html => bodyEl.innerHTML = html)
        .catch(() => bodyEl.textContent = "(Unable to load email body)");
    }

    else if (msg.bodyHtml) {
        bodyEl.innerHTML = msg.bodyHtml;
    }

    else {
        bodyEl.textContent = msg.body || "";
    }


}

function renderEmptyDetail(detailEl) {
    detailEl.innerHTML = `<p class="craigmail-empty">Select a message from the left to read it.</p>`;
}

function formatTimestamp(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    return d.toLocaleString();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
