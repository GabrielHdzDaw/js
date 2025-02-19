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
}

// #region DOM
document.addEventListener("DOMContentLoaded", () => {
  const addProjectButton = document.getElementById("addProjectButton");
  const saveButton = document.getElementById("saveButton");
  const cancelProjectButton = document.getElementById("cancelProjectButton");
  const cancelNoteButton = document.getElementById("cancelNoteButton");
  const addProjectDialog = document.getElementById("addProjectDialog");
  const addNoteDialog = document.getElementById("addNoteDialog");
  const addProjectForm = document.getElementById("addProjectForm");
  const addNoteForm = document.getElementById("addNoteForm");
  const projectList = document.getElementById("projectList");
  const projectTemplate = document.querySelector(".project");
  const noteTemplate = document.querySelector(".note");
  const complexNoteTemplate = document.querySelector(".complex-note");

  const taskList = new TODOList();


  //#region Event listeners
  addProjectButton.addEventListener("click", () => {
    addProjectDialog.showModal();
  });

  cancelProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProjectForm.reset();
    addProjectDialog.close();
  });

  cancelNoteButton.addEventListener("click", (event) => {
    event.preventDefault();
    addNoteForm.reset();
    document.getElementById("descriptionContainer").style.display = "none";
    document.getElementById("addDescription").checked = false;
    addNoteDialog.close();
  });

  addProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addProject();
    addProjectDialog.close();
    renderProjects();
  });

  addNoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addNote();
    addNoteDialog.close();
    renderProjects();
  });

  //#region RenderProjects
  function renderProjects() {
    projectList.innerHTML = "<h2>Proyectos</h2>";

    if (taskList.projects.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerHTML = `
        <p>No tienes proyectos todavía.</p>
        <button id="createFirstProject">Crear tu primer proyecto</button>
      `;
      projectList.appendChild(emptyState);

      document
        .getElementById("createFirstProject")
        .addEventListener("click", () => {
          addProjectDialog.showModal();
        });

      return;
    }

    taskList.projects.forEach((project) => {
      const projectElement = projectTemplate.content.cloneNode(true);
      const projectName = projectElement.querySelector(".project-name");
      const projectDescription = projectElement.querySelector(
        ".project-description"
      );
      const noteList = document.createElement("div");
      noteList.className = "note-list";
      const addNoteButton = projectElement.querySelector(".add-note");
      const deleteProjectButton =
        projectElement.querySelector(".delete-project");

      projectName.textContent = project.name;
      projectDescription.textContent = project.description;

      projectElement.querySelector("article").appendChild(noteList);

      if (project.notes.length === 0) {
        const emptyNoteState = document.createElement("p");
        emptyNoteState.className = "empty-note-state";
        emptyNoteState.textContent = "No hay notas en este proyecto";
        noteList.appendChild(emptyNoteState);
      } else {
        project.notes.forEach((note) => {
          const noteElement = renderNote(note, project);
          noteList.appendChild(noteElement);
        });
      }

      addNoteButton.addEventListener("click", () => {
        addNoteDialog.dataset.projectIndex = taskList.projects.indexOf(project);
        addNoteDialog.showModal();
      });

      deleteProjectButton.addEventListener("click", () => {
        if (
          confirm(`¿Estás seguro de eliminar el proyecto "${project.name}"?`)
        ) {
          taskList.removeProject(project);
          renderProjects();
        }
      });

      projectList.appendChild(projectElement);
    });
  }

  //#region RenderNote
  function renderNote(note, project) {
    const template = note.description ? complexNoteTemplate : noteTemplate;
    const noteElement = template.content.cloneNode(true);
    const noteArticle = noteElement.querySelector("article");
    const noteName = noteElement.querySelector(".note-name");
    const deleteNoteButton = document.createElement("button");

    noteName.textContent = note.title;

    if (note.description) {
      const noteDescription = noteElement.querySelector(".note-description");
      noteDescription.textContent = note.description;
    }

    
    noteArticle.style.backgroundColor = note.color;

   
    const brightness = calculateBrightness(note.color);
    const textColor = brightness > 128 ? "black" : "white";
    noteArticle.style.color = textColor;

    const completeCheckbox = noteElement.querySelector(
      'input[type="checkbox"]'
    );
    if (completeCheckbox) {
      completeCheckbox.checked = note.complete;
      completeCheckbox.addEventListener("change", () => {
        note.complete = completeCheckbox.checked;

        if (note.complete) {
          noteArticle.style.opacity = "0.6";
          noteArticle.style.textDecoration = "line-through";
        } else {
          noteArticle.style.opacity = "1";
          noteArticle.style.textDecoration = "none";
        }

        saveData();
      });

      if (note.complete) {
        noteArticle.style.opacity = "0.6";
        noteArticle.style.textDecoration = "line-through";
      }
    }

    deleteNoteButton.textContent = "Eliminar";
    deleteNoteButton.className = "delete-note";
    deleteNoteButton.addEventListener("click", () => {
      if (confirm("¿Estás seguro de eliminar esta nota?")) {
        project.removeNote(note);
        renderProjects();
      }
    });

    noteArticle.appendChild(deleteNoteButton);

    return noteArticle;
  }

  //#region AddProject
  function addProject() {
    const formData = new FormData(addProjectForm);
    const projectName = formData.get("projectName");
    const projectDescription = formData.get("projectDescription");

    if (!projectName) {
      alert("El projecto debe de tener nombre");
      return;
    }

    const project = new Project(projectName, projectDescription, []);
    taskList.addProject(project);
    addProjectForm.reset();
    saveData(); 
  }

  //#region AddNote
  function addNote() {
    const formData = new FormData(addNoteForm);
    const noteTitle = formData.get("noteTitle");
    let noteColor = formData.get("color");
    if (!noteColor || !/^#[0-9A-Fa-f]{6}$/.test(noteColor)) {
      noteColor = "#ffffff"; 
    }
    const addDescription = document.getElementById("addDescription");
    const projectIndex = parseInt(addNoteDialog.dataset.projectIndex, 10);

    if (!noteTitle) {
      alert("La nota debe tener título");
      return;
    }

    if (
      isNaN(projectIndex) ||
      projectIndex < 0 ||
      projectIndex >= taskList.projects.length
    ) {
      alert("Selecciona un proyecto válido");
      return;
    }

    let note;
    if (addDescription.checked) {
      const noteDescription = formData.get("noteDescription");
      note = new ComplexNote(noteTitle, noteColor, false, noteDescription);
    } else {
      note = new Note(noteTitle, noteColor, false);
    }

    taskList.projects[projectIndex].addNote(note);
    addNoteForm.reset();
    const descriptionContainer = document.getElementById(
      "descriptionContainer"
    );
    if (descriptionContainer) {
      descriptionContainer.style.display = "none";
    }
    document.getElementById("addDescription").checked = false;
    saveData(); 
  }

  
  //#region CalculateBrightness
  function calculateBrightness(hex) {
    const rgb = hexToRgb(hex);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  loadData();
  renderProjects();

  saveButton.addEventListener("click", () => {
    saveData();
    alert("Datos guardados");
  });

  //#region Save & load data
  function saveData() {
    localStorage.setItem("todoListData", JSON.stringify(taskList.projects));
  }

  function loadData() {
    const savedData = localStorage.getItem("todoListData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        parsedData.forEach((projectData) => {
          const project = new Project(
            projectData._name,
            projectData._description,
            []
          );

          if (projectData._notes && Array.isArray(projectData._notes)) {
            projectData._notes.forEach((noteData) => {
              let note;
              if (noteData._description !== undefined) {
                note = new ComplexNote(
                  noteData._title,
                  noteData._color,
                  noteData._complete,
                  noteData._description
                );
              } else {
                note = new Note(
                  noteData._title,
                  noteData._color,
                  noteData._complete
                );
              }
              project.addNote(note);
            });
          }

          taskList.addProject(project);
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
        localStorage.removeItem("todoListData");
      }
    }
  }

  window.addEventListener("beforeunload", saveData);
});
