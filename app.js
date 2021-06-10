import api from './api.js'
const button = document.querySelector('[type=submit]');
const container = document.querySelector('.parent');
const loadCOntainer  = document.querySelector('.load');
let page = 1;

const addListInDOm = async () => {
  const cardList = document.querySelector('.card');
  const list = await api.allList(page);
  cardList.innerHTML += resultSearch(list);  
  return list
}

const resultSearch = list => list.map(({title, id})=> (`
            <div class="item" data-post>
              <label class="post-title" data-post-id="${id}">${title}</label>
              <label class="ball" data-content="${id}"></label>
            </div>   
    `)).join('');

button.addEventListener('click', evt => {
  evt.preventDefault();
  const search = document.querySelector('[name=search]').value; 
   searchPost(search);
});

const searchPost  = (value) => {
  const posts = Array.from(document.querySelectorAll('[data-post]'));
  const newValue = value.toLocaleLowerCase()
  posts.forEach(post => {
    const title = post.querySelector('.post-title').textContent.toLocaleLowerCase();
    if(title.includes(newValue)) {
       post.style.display = 'flex';
       return
    }
    post.style.display = 'none';
   
  })

}


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

container.addEventListener('scroll',  ({ target })=> {
  const { clientHeight, scrollTop, scrollHeight } = target
  const currentScrollHeight = scrollTop + clientHeight;
  const isArrirevInTheEnd = currentScrollHeight > scrollHeight - 10;
  if(isArrirevInTheEnd) showLoadPage();  
});

addListInDOm();
