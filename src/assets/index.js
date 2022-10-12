const API_YOUTUBE = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCDVYQ4Zhbm3S2dlz7P1GBDg&part=snippet%2Cid&order=date&maxResults=10'

const API_NFL_SHEDULE = 'https://nfl-schedule.p.rapidapi.com/v1/schedules'


const optionsYoutube = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '392179bfc3msh25280fc907ce986p111b5bjsn1575bbf6c0a1',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const optionsNflSchedule = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '392179bfc3msh25280fc907ce986p111b5bjsn1575bbf6c0a1',
    'X-RapidAPI-Host': 'nfl-schedule.p.rapidapi.com'
  }
};


const content = null || document.querySelector('#content');
const schedule = null || document.querySelector('#schedule');

async function fetchData(urlApi, options) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API_YOUTUBE, optionsYoutube);
    console.log(videos)

    let viewVideos = `
    ${videos.items.map((video) =>
      `<div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-400">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>`
    ).slice(0, 8).join('')}`

    const dataSchedule = await fetchData(API_NFL_SHEDULE, optionsNflSchedule);
    console.log(dataSchedule)

    let viewSchedule = `
    ${dataSchedule.data.map((game) => `
      <div class="flex flex-col py-2 px-4 rounded-lg bg-slate-600 text-white my-2 text-center">
        <div class="text-xs">${getDate(game.date)}</div>
         <div class="text-xs">${getTime(game.date)}</div>
         <div class="flex flex-row">
            <div class="w-full">
              <h3 class="text-blue-500">${game.awayTeam.name}</h3>
              <h4 class="text-2xl text-cyan-400">${game.awayTeam.score}</h4>
            </div>
           <div class="w-full">
              <h3 class="text-indigo-500">${game.homeTeam.name}</h3>
              <h4 class="text-2xl text-cyan-400">${game.homeTeam.score}</h4>
           </div>
          </div>
      </div>
    `).join('')}
    `
    content.innerHTML = viewVideos
    schedule.innerHTML = viewSchedule

  } catch (e) {
    console.log(e);
  }
})();

function getDate(string) {
  const date = new Date(string)
  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return longEnUSFormatter.format(date);
}

function getTime(string) {
  const date = new Date(string)
  const shortEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
  return shortEnUSFormatter.format(date)
}