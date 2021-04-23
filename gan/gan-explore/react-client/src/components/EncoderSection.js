import React, { useState, useEffect } from "react";
import ImageUploading from 'react-images-uploading';
import store from '../state';
import { useSelector } from 'react-redux';
import TreeChart from './TreeChart';
import useSpinner from './useSpinner';

export default function EncoderSection(props) {
  const dataset = useSelector(state => state.dataset);
  const [loading, showLoading, hideLoading] = useSpinner();
  const ENDPOINT = useSelector(state => state.ENDPOINT);
  const [images, setImages] = useState([]);
  const [parentsData, setParentsData] = useState([]);
  const [currentParent, setCurrentParent] = useState({})
  const currentStep = useSelector(state => state.currentStep);
  const currentShuffle = useSelector(state => state.currentShuffle);
  const snapshot = useSelector(state => state.snapshot);
  const maxSteps = useSelector(state => state.maxSteps);
  const [isGenerating, setIsGenerating] = useState(true);

  const onSubmit = () => {
    setIsGenerating(true)
    const data = {
      dataset: dataset,
      steps: maxSteps,
      snapshot: snapshot,
      type: currentShuffle,
      currentStep: currentStep
    }
    fetch(ENDPOINT + '/shuffle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((data) => {
        if (data.result === "OK") {
          return fetch(ENDPOINT + '/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
        } else {
          alert(data.result);
        }
      })
      .then(res => res.json())
      .then((data) => {
        console.log("Publish result", data);
        if (data.result === "OK") {
          console.log("Server is publishing!");
        } else {
          alert(data.result);
        }
      })
      .then(() => {
        showLoading();
        setTimeout(() => {
          hideLoading()
        }, 2000)
      })
  }

  const onChange = (imageList, addUpdateIndex) => {
    setIsGenerating(true)
    console.log(imageList, addUpdateIndex);
    store.dispatch({
      type: 'SAVE_FILE_NAME',
      file_name: images
    })
    setImages(images => [...images, ...imageList]);
    console.log(images);

    console.log("Submitting image for encoding!", imageList)
    fetch(ENDPOINT + '/encode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imageList.map((image, i) => (
        JSON.stringify({
          data: image.data_url,
          fileName: image.file.name
        })
      ))
    })
      .then(res => res.json())
      .then((data) => {
        if (data.result === "OK") {
          console.log("Result!", data)
        } else {
          alert(data.result);
        }
      })
     if (currentStep < (maxSteps - 1)) {
        const childImage = {
          name: images[0].file.name,
          url: images[0].data_url, 
          children:[] }
          setCurrentParent({...currentParent, children:[...currentParent.children, childImage]})
      }
     if (currentStep === (maxSteps - 1)) {
      setParentsData(parentsData => [...parentsData, currentParent])
      setCurrentParent({...imageList, children:[]})
  }
    
    console.log('current parent', currentParent)
    console.log('parent data', parentsData)

  };

  useEffect(() => {
    if (currentStep === (maxSteps - 1)) {
      setIsGenerating(false)
    }
  }, [currentStep])


  return (
    <div className="fileUploader">
      <div>
        <h1>{dataset}</h1>
      </div>
      <div className="mainSection" >
        <div className='encodeRandom'>
          <div className="encoderSection">
            <button disabled={isGenerating} className="btn generate" name="generate" type="onSubmit" onClick={onSubmit}>Generate Randomly</button>

            {loading}

            <ImageUploading
              value={images}
              onChange={onChange}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                isDragging,
                dragProps,
              }) => (

                <div className="upload__image-wrapper">
                  <button disabled={isGenerating} className="btn generate"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}> Upload your image </button>
            &nbsp;

                  {/* {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <p>({image.file.name})</p> */}
                  {/* <img src={image['data_url']} alt="" width="100" /> */}
                  {/* </div>
            ))} */}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
      </div>
      <TreeChart data={parentsData} />
    </div>
  );
}
