import { Project } from "./project.js";
import { Note, ComplexNote } from "./note.js";

// #region TODOList class
class TODOList {
    constructor() {
        this.projects = [];
    }
    addProject(project) {
        this.projects.push(project);
    }
    removeProject(project) {
        this.projects = this.projects.filter((p) => p !== project);
    }

    renderProjects() {
        projectList.innerHTML = '';
        this.projects.forEach((project) => {
            const projectTemplateClone = projectTemplate.content.cloneNode(true);
            projectTemplateClone.querySelector('.project-title').textContent = project.name;
            projectTemplateClone.querySelector('.project-description').textContent = project.description;
            this.renderNotes(project, projectTemplateClone);
            
            projectTemplateClone.querySelector('.create-note-button').addEventListener('click', () => {
                noteDialog.dataset.currentProject = this.projects.indexOf(project); // Guarda el índice del proyecto
                noteDialog.showModal();
            });
            
            projectTemplateClone.querySelector('.delete-project-button').addEventListener('click', () => {
                this.removeProject(project);
                this.renderProjects();
            });
            
            projectList.appendChild(projectTemplateClone);
        });
    }

    renderNotes(project, projectTemplateClone) {
        project.notes.forEach((note) => {
            const noteTemplateClone = noteTemplate.content.cloneNode(true);
            noteTemplateClone.querySelector('.note-title').textContent = note.title;
            noteTemplateClone.querySelector('.note-complete').checked = note.complete;
            
            noteTemplateClone.querySelector('.note-complete').addEventListener('change', (event) => {
                note.complete = event.target.checked;
            });
            
            noteTemplateClone.querySelector('.delete-note-button').addEventListener('click', () => {
                project.removeNote(note);
                this.renderProjects();
            });
            
            projectTemplateClone.querySelector('.note-list').appendChild(noteTemplateClone);
        });
    }
}

const todoList = new TODOList();
const createProjectButton = document.getElementById('createProjectButton');
const projectList = document.getElementById('projectList');

const projectDialog = document.getElementById('projectDialog');
const projectForm = document.getElementById('projectForm');

const noteDialog = document.getElementById('noteDialog');
const noteForm = document.getElementById('noteForm');

const projectTemplate = document.getElementById('projectTemplate');
const noteTemplate = document.getElementById('noteTemplate');
const complexNoteTemplate = document.getElementById('complexNoteTemplate');

createProjectButton.addEventListener('click', () => {
    projectDialog.showModal();
});

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(projectForm);
    const name = formData.get('projectName');
    const description = formData.get('projectDescription');
    const project = new Project(name, description, []);
    todoList.addProject(project);
    projectDialog.close();
    todoList.renderProjects();
    console.log(`Project created: ${project}`);
});

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(noteForm);
    const title = formData.get('noteTitle');
    const color = formData.get('noteColor');
    const projectIndex = noteDialog.dataset.currentProject; // Obtener el proyecto almacenado

    if (projectIndex === undefined) {
        console.error("No project selected for the note.");
        return;
    }

    const note = new Note(title, color, false);
    todoList.projects[projectIndex].addNote(note); // Agregar al proyecto correcto
    
    noteDialog.close();
    todoList.renderProjects();
    console.log(`Note created in project ${projectIndex}: ${note}`);
});
