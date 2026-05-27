// Photos interleaved by category for visual variety in "all" view
const photos = [
  { src: 'assets/:landcape/landscape_01.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_01.jpeg',            cat: 'people'        },
  { src: 'assets/:sport/sport_01.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_02.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_02.jpeg',            cat: 'people'        },
  { src: 'assets/:sport/sport_02.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_03.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_03.JPG',             cat: 'people'        },
  { src: 'assets/:sport/sport_03.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_04.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_04.jpg',             cat: 'people'        },
  { src: 'assets/:sport/sport_04.jpg',               cat: 'sport'         },
  { src: 'assets/:architecture/architecture_01.jpg', cat: 'architecture'  },
  { src: 'assets/:landcape/landscape_05.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_05.jpg',             cat: 'people'        },
  { src: 'assets/:sport/sport_05.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_06.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_06.jpg',             cat: 'people'        },
  { src: 'assets/:sport/sport_06.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_07.jpg',        cat: 'landscape'     },
  { src: 'assets/:people/people_07.jpg',             cat: 'people'        },
  { src: 'assets/:sport/sport_07.jpg',               cat: 'sport'         },
  { src: 'assets/:landcape/landscape_08.jpg',        cat: 'landscape'     },
  { src: 'assets/:landcape/landscape_09.jpg',        cat: 'landscape'     },
  { src: 'assets/:landcape/landscape_12.jpg',        cat: 'landscape'     },
  { src: 'assets/:landcape/lanscape_11.jpg',         cat: 'landscape'     },
];

const gallery = document.getElementById('gallery');
let activeFilter = 'landscape';

function applyHeroIfLandscape() {
  if (activeFilter !== 'landscape') return;
  const firstItem = gallery.querySelector('.gallery-item');
  if (!firstItem) return;
  const img = firstItem.querySelector('img');
  if (!img) return;
  const check = () => {
    if (img.naturalWidth > img.naturalHeight) firstItem.classList.add('is-hero');
  };
  img.complete && img.naturalWidth ? check() : img.addEventListener('load', check, { once: true });
}

function render() {
  const savedScroll = window.scrollY;

  const items = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.cat === activeFilter);

  gallery.innerHTML = items
    .map(({ src, cat }) =>
      `<div class="gallery-item" data-cat="${cat}">` +
        `<img src="${src}" alt="${cat}" loading="lazy">` +
      `</div>`
    )
    .join('');

  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === activeFilter);
  });

  applyHeroIfLandscape();
  requestAnimationFrame(() => window.scrollTo(0, savedScroll));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    render();
  });
});

render();
