const notesApp = {

    currentEditIndex: null,

    init() {

        this.loadNotes();

        this.setupEventListeners();

    },

    setupEventListeners() {

        document.getElementById('searchInput').addEventListener('input', (e) => {

            this.filterNotes(e.target.value);

        });

        document.getElementById('noteInput').addEventListener('input', (e) => {

            document.getElementById('charCount').textContent = 

                `${e.target.value.length}/500`;

        });

    },

    addNote() {

        const input = document.getElementById('noteInput');

        const text = input.value.trim();

        if (!text) return this.showError('الرجاء إدخال نص الملاحظة');

        if (text.length > 500) return this.showError('الحد الأقصى 500 حرف');

        const notes = this.getNotes();

        if (this.currentEditIndex !== null) {

            notes[this.currentEditIndex] = text;

            this.currentEditIndex = null;

        } else {

            notes.unshift(text);

        }

        this.saveNotes(notes);

        this.renderNotes(notes);

        input.value = '';

        document.getElementById('charCount').textContent = '0/500';

    },

    deleteNote(index) {

        if (!confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) return;

        

        const notes = this.getNotes();

        notes.splice(index, 1);

        this.saveNotes(notes);

        this.renderNotes(notes);

    },

    editNote(index) {

        const notes = this.getNotes();

        document.getElementById('noteInput').value = notes[index];

        this.currentEditIndex = index;

        window.scrollTo({ top: 0, behavior: 'smooth' });

    },

    filterNotes(searchText) {

        const notes = this.getNotes();

        const filtered = notes.filter(note => 

            note.toLowerCase().includes(searchText.toLowerCase())

        );

        this.renderNotes(filtered);

    },

    getNotes() {

        return JSON.parse(localStorage.getItem('notes') || '[]');

    },

    saveNotes(notes) {

        localStorage.setItem('notes', JSON.stringify(notes));

    },

    loadNotes() {

        const notes = this.getNotes();

        this.renderNotes(notes);

    },

    renderNotes(notes) {

        const container = document.getElementById('notesContainer');

        const emptyState = document.getElementById('emptyState');

        

        container.innerHTML = '';

        emptyState.style.display = notes.length ? 'none' : 'block';

        notes.forEach((text, index) => {

            const noteEl = document.createElement('div');

            noteEl.className = 'note-card';

            noteEl.innerHTML = `

                <div class="note-actions">

                    <button onclick="notesApp.editNote(${index})">✏️</button>

                    <button onclick="notesApp.deleteNote(${index})">🗑️</button>

                </div>

                <div class="note-content">${text}</div>

            `;

            container.appendChild(noteEl);

        });

    },

    showError(message) {

        alert(message);

    }

};

// Initialize app

document.addEventListener('DOMContentLoaded', () => notesApp.init());