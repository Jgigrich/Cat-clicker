const model = {
  cats: [
          {name: 'Ted',     clicks: 0, src: 'img\\512px-Kittyplya03042006.JPG', alt: 'Cat'},
          {name: 'Borg',    clicks: 0, src: 'img\\512px-American_Wirehair.JPG', alt: 'Cat'},
          {name: 'Puffy',   clicks: 0, src: 'img\\Hauskaz_hell.jpg',            alt: 'Cat'},
          {name: 'Speedy',  clicks: 0, src: 'img\\512px-Neugierige-Katze.JPG',  alt: 'Cat'},
          {name: 'Alice',   clicks: 0, src: 'img\\512px-FleurAmour.jpg',        alt: 'Cat'},
          {name: 'Jill',    clicks: 0, src: 'img\\Ankara_Kedisi_(Prenses).jpg', alt: 'Cat'},
          {name: 'Sherri',  clicks: 0, src: 'img\\Sherri_with_mouse.jpg',       alt: 'Cat'},
          {name: 'Jonesie', clicks: 0, src: 'img\\Jonesie_(2410643631).jpg',    alt: 'Cat'},
          {name: 'Lily',    clicks: 0, src: 'img\\Tortoiseshellshorthair.JPG',  alt: 'Cat'}
        ]
};

const octopus = {
   buildNav: function() {
                let catNames = document.createDocumentFragment();//document.createElement('ul');
                model.cats.forEach(function(cat, index) {
                    let catName = document.createElement('BUTTON');
                    catName.classList.add('nav-btn');
                    catName['data-num'] = index;
                    catName.textContent = model.cats[index].name;
                    catNames.appendChild(catName);
                });
                return catNames;
              },
viewerString: function(index) {
                let cat = model.cats[index];
                return `<h1>${cat.name}</h1><h2>Clicks: ${cat.clicks}</h2><img data-num="${index}" src="${cat.src}">`;
              },
    navClick: function(e) {
                if(e.target.tagName === 'BUTTON') {
                  view.renderViewer(e.target['data-num']);
                }
              },
    catClick: function(e) {
                if(e.target.tagName === 'IMG') {
                  let currentCat = e.target.dataset.num;
                  model.cats[currentCat].clicks++;
                  view.renderClicks(model.cats[currentCat].clicks);
                }
              }
};

const view = {
   navContainer:  document.querySelector('.nav-container'),
         viewer:  document.querySelector('.viewer'),
           init:  function() {
                    this.renderNav();
                    this.renderViewer(0);
                    this.navContainer.addEventListener('click', octopus.navClick);
                    this.viewer.addEventListener('click', octopus.catClick);
                  },
      renderNav:  function() {
                     this.navContainer.appendChild(octopus.buildNav());
                  },
   renderViewer:  function(index) {
                    this.viewer.innerHTML = octopus.viewerString(index);
                  },
   renderClicks:  function(num) {
                    document.querySelector('.viewer h2').textContent = 'Clicks: ' + num;
                  }
};

view.init();
