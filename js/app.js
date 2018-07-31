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
          {name: 'Lilly',   clicks: 0, src: 'img\\Tortoiseshellshorthair.JPG',  alt: 'Cat'}
        ],
  currentCat: null
};

const octopus = {
  getCurrCat: function() {
                return model.currentCat;
              },
  setCurrCat: function(index) {
                model.currentCat = model.cats[index];
              },
     getCats: function() {
                return model.cats;
              },
    navClick: function(e) {
                if(e.target.tagName === 'BUTTON') {
                  if(e.target.classList.contains('admin-btn')) {view.toggleForm();}
                  else {
                    octopus.setCurrCat(e.target['data-num'])
                    view.renderViewer();
                  }
                }
              },
    catClick: function(e) {
                if(e.target.tagName === 'IMG') {
                  model.currentCat.clicks++;
                  view.renderClicks();
                }
              },
   formClick: function(e) {
                if(e.target.tagName = 'BUTTON') {
                    switch(e.target.id) {
                      case 'reset-btn':  view.populateForm(); break;
                      case 'cancel-btn': view.toggleForm();   break;
                      case 'save-btn':   octopus.saveForm();
                    }
                }
              },
    saveForm: function() {
                let cat = this.getCurrCat(),
                    form = document.querySelector('.admin');
                cat.name = form[0].value;
                cat.src = form[1].value.replace('\\', '\\\\');
                cat.clicks = form[2].value;
                view.toggleForm();
                view.renderViewer();
                view.renderNav();
              }
};

const view = {
   navContainer:  document.querySelector('.nav-container'),
         viewer:  document.querySelector('.viewer'),
           form:  document.querySelector('.admin'),
           name:  document.querySelector('.admin input[id="name"]'),
            url:  document.querySelector('.admin input[id="url"]'),
         clicks:  document.querySelector('.admin input[id="clicks"]'),
       formBtns:  document.querySelector('.form-btns'),
           init:  function() {
                    octopus.setCurrCat(0);
                    this.renderNav();
                    this.renderViewer();
                    this.navContainer.addEventListener('click', octopus.navClick);
                    this.viewer.addEventListener('click', octopus.catClick);
                    this.formBtns.addEventListener('click', octopus.formClick);
                  },
      renderNav:  function() {
                    this.navContainer.innerHTML = '<button class="nav-btn admin-btn">admin</button>';
                    let navButtons = document.createDocumentFragment();
                    let cats = octopus.getCats();
                    cats.forEach(function(cat, index) {
                       let catName = document.createElement('BUTTON');
                       catName.classList.add('nav-btn');
                       catName['data-num'] = index;
                       catName.textContent = model.cats[index].name;
                       navButtons.appendChild(catName);
                    });
                    this.navContainer.insertBefore(navButtons, this.navContainer.childNodes[0]);
                  },
   renderViewer:  function(index) {
                    let cat = octopus.getCurrCat(),
                        name = `<h1>${cat.name}</h1>`,
                        clicks = `<h2>Clicks: ${cat.clicks}</h2>`,
                        pic = `<img data-num="${index}" src="${cat.src}">`;
                    this.viewer.innerHTML = name + clicks + pic;
                  },
   renderClicks:  function() {
                    let cat = octopus.getCurrCat()
                    document.querySelector('.viewer h2').textContent = 'Clicks: ' + cat.clicks;
                  },
     toggleForm:  function() {
                    this.form.classList.toggle('show');
                    this.populateForm();
                  },
   populateForm:  function() {
                    let cat = octopus.getCurrCat();
                    this.name.value = cat.name;
                    this.url.value = cat.src;
                    this.clicks.value = cat.clicks;
                  }
};

view.init();
