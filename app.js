import api from './api.js'
const button = document.querySelector('[type=submit]');
const container = document.querySelector('.parent');
const loadCOntainer  = document.querySelector('.load');
let page = 1;

const addListInDOm = async (search) => {
  const cardList = document.querySelector('.card');
  const list = await api.allList(page);
  const newList = !!search ?  list.filter(item => item.title.includes(search)) : list;

  if(search) {
     cardList.innerHTML = resultSearch(newList);
  }
  cardList.innerHTML += resultSearch(newList);
  
  return newList
}

const resultSearch = list => list.map(({title, id})=> (`
            <div class="item">
              <label>Title:${title}</label>
              <label class="ball" data-content="${id}"></label>
            </div>   
    `)).join('');

button.addEventListener('click', evt => {
  evt.preventDefault();
  const search = document.querySelector('[name=search]').value; 
   addListInDOm(search);
});


const showLoad = () => {
    loadCOntainer.classList.remove('hidden');
    loadCOntainer.classList.add('visible');
}

const closeLoad = ()=> {
    loadCOntainer.classList.remove('visible');
    loadCOntainer.classList.add('hidden');
}

const getNextPost = async ()=> {
try {
  page++
  const result =  await addListInDOm();

  if(result.length) {
    closeLoad()
  } else {
    throw new Error('Acabou a listagem!');
  }
} catch (error) {
  alert(error.message);
  setTimeout(()=>closeLoad(),
    1000)
  }
}

const showLoadPage = () => {
  const hasHidden =  [...loadCOntainer.classList].includes('hidden');
  if(hasHidden) {
    showLoad();
    getNextPost()
  }
}

container.addEventListener('scroll', e=> {
  const { clientHeight, scrollTop, scrollHeight } = e.target
  const currentScrollHeight = scrollTop + clientHeight;
  const isArrirevInTheEnd = currentScrollHeight > scrollHeight - 15;

  if(isArrirevInTheEnd) showLoadPage();
  
});

addListInDOm();
