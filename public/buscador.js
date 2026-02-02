const topbar = document.querySelector('.topbar');
const hamburgerBtn = document.querySelector('.hamburger');
const mobileNav = document.querySelector('#mobileMenu');

hamburgerBtn.addEventListener('click', () => {
const isOpen = topbar.classList.toggle('is-open');
hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
hamburgerBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.mobile-nav a').forEach(a => {
a.addEventListener('click', () => {
    topbar.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
});
});

/* MODAL */
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const modalMeta = document.querySelector('#modalMeta');
const modalCloseBtn = document.querySelector('#modalCloseBtn');

const modalThumbWrap = document.querySelector('#modalThumbWrap');
const modalThumb = document.querySelector('#modalThumb');

let lastFocusedElement = null;

function openModal({ title, text, meta, imageUrl }) {
lastFocusedElement = document.activeElement;

modalTitle.textContent = title || 'Detalhes';
modalText.textContent = text || '';
modalMeta.textContent = meta || '';

if (imageUrl) {
    modalThumb.src = imageUrl;
    modalThumb.alt = title || 'Imagem do item';
    modalThumbWrap.style.display = '';
} else {
    modalThumb.src = '';
    modalThumb.alt = '';
    modalThumbWrap.style.display = 'none';
}

// garante transição (estado inicial -> final)
modal.classList.remove('is-open');
modal.setAttribute('aria-hidden', 'false');

requestAnimationFrame(() => {
    modal.classList.add('is-open');
});

modalCloseBtn.focus();
document.body.style.overflow = 'hidden';
}

function closeModal() {
modal.classList.remove('is-open');

setTimeout(() => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    }
}, 200);
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
if (e.target && e.target.getAttribute('data-close') === 'true') {
    closeModal();
}
});

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
}
});

document.addEventListener('click', (e) => {
const target = e.target.closest('[data-modal]');
if (!target) return;

const type = target.getAttribute('data-modal');

if (type === 'card') {
    const id = target.getAttribute('data-id');
    const title = target.getAttribute('data-title');
    const description = target.getAttribute('data-description');
    const imageUrl = target.getAttribute('data-image');

    openModal({
    title: title || 'Post',
    text: description || 'Sem descrição.',
    meta: id ? `ID do post: ${id}` : '',
    imageUrl
    });
    return;
}

if (type === 'page') {
    const page = target.getAttribute('data-page');

    let title = 'Paginação';
    let text = '';
    let meta = '';

    if (page === 'prev') {
    title = 'Página anterior';
    text = 'Aqui você pode implementar a lógica de voltar a página.';
    } else if (page === 'next') {
    title = 'Próxima página';
    text = 'Aqui você pode implementar a lógica de avançar a página.';
    } else if (page === 'dots') {
    title = 'Mais páginas';
    text = 'Você pode abrir um seletor de páginas ou navegar por intervalos.';
    } else {
    title = `Página ${page}`;
    text = `Você clicou na página ${page}. Aqui podem entrar informações do conteúdo dessa página.`;
    meta = `Ação simulada (modal) — depois você pode trocar para navegação real.`;
    }

    openModal({ title, text, meta, imageUrl: '' });
}
});