import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  OPEN_TPL_IMAGE_MODAL,
  CLOSE_TPL_IMAGE_MODAL,

  FETCH_IMAGES,
  UPLOAD_IMAGE,

  API_ERROR
} from './types'

export const openTplImageModal = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_TPL_IMAGE_MODAL
    })
  }
}

export const closeTplImageModal = (selectedImage) => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_TPL_IMAGE_MODAL,
      data: selectedImage
    })
  }
}

export const uploadImage = (formData) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/upload`, formData)
      .then(response => uploadImageSuccess(dispatch, response))
      .catch(error => uploadImageFail(dispatch, error))
  }

  const uploadImageFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const uploadImageSuccess = (dispatch, response) => {
    dispatch({
      type: UPLOAD_IMAGE,
      data: response.data
    })
  }
}

export const fetchImages = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/customImage`)
      .then(response => fetchImagesSuccess(dispatch, response))
      .catch(error => fetchImagesFail(dispatch, error))
  }

  const fetchImagesFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const fetchImagesSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_IMAGES,
      data: response.data._embedded.customImages
    })
  }
}
