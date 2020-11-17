import '../styles/main.scss';

import projects from './projects.js';

// projects section markup
const projectsList = document.getElementById('_projects__list');

projects.forEach((project) => {
  const markup = /*html*/ `
        <div class="project">
        <!-- image -->
            <div class="project__image">
                <img src="${project.image}" alt="" srcset=""/>
            </div>    
            <div class="project__info">
                <div class="project__info-header">
                    <div class="project__header">
                    <h1 class="project__title">${project.title}</h1>
                    <a class=" project__link project__code" href="${
                      project.github
                    }" target="blank">Github</a>
                    <a class="project__link project__demo" href="${
                      project.demo
                    }" target="blank">Demo</a>
                    </div>
                    <h4 class="project__description">${project.description}</h4>
                    <div class="project__techs">
                    ${project.tech
                      .map(
                        (tech) => `<span class="project__tech">${tech}</span>`
                      )
                      .join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
  projectsList.insertAdjacentHTML('beforeend', markup);
});
