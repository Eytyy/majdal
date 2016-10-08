import axios from 'axios';

function getFrontVideo() {
  return axios.get('/api/video')
    .then((results) => results)
    .catch(err => err);
}

function getOils() {
  return axios.get('/api/oils')
    .then((results) => results)
    .catch(err => err);
}

function getOlivesCategories() {
  return axios.get('/api/olives')
    .then((results) => results)
    .catch(err => {
      console.log(err);
    });
}

function getOlives(id) {
  return axios.get(`/api/olives/${id}`)
    .then((results) => results)
    .catch(err => {
      console.log(err);
    });
}

function getEstatesMain(id) {
  if (id) {
    return axios.get(`/api/estate/${id}`)
      .then((results) => results)
      .catch(err => err);
  }
  return axios.get('/api/estate')
    .then((results) => results)
    .catch(err => err);
}

function getEstatesSubs() {
  return axios.get('/api/estatesubs')
    .then((results) => results)
    .catch(err => err);
}

function getEstateLanding() {
  return axios.get('/api/estatelanding')
    .then((results) => results)
    .catch(err => err);
}

function getEstates(id) {
  return axios.all([getEstateLanding(), getEstatesMain(id), getEstatesSubs()])
    .then(arr => (
      {
        landing: arr[0].data,
        estate: arr[1].data,
        subs: arr[2].data,
      }
    ));
}

function getAdjacentEstates(order) {
  return axios.get(`/api/adjacent/${order}`)
    .then((results) => results)
    .catch(err => err);
}


export { getOils, getOlivesCategories, getEstates, getAdjacentEstates, getOlives, getFrontVideo };
