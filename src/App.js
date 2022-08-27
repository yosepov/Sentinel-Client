import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { selectMapOne, selectMapTwo, setMapOne, setMapTwo } from './features/map/mapSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { ResponsiveAppBar } from './Components/navBar';

const CanvasJSX = ({ canRef }) => <canvas style={{ margin: '10px' }} ref={canRef} width={400} height={500} />

export const App = () => {
  const [brightness, setBrightness] = useState(100)
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const imageOne = useSelector(selectMapOne)
  const imageTwo = useSelector(selectMapTwo)
  const canvasImageOne = useRef();
  const canvasImageTwo = useRef();

  const imageCanOne = useMemo(() => new Image(), [])
  const imageCanTwo = useMemo(() => new Image(), [])


  useEffect(() => {
    if (index === 1 && !imageOne) {
      axios.get(`http://localhost:8080/api/maps/512/698.082/jpeg/30`)
        .then(res => {
          dispatch(setMapOne(res.data.imageData))
        })

      axios.get(`http://localhost:8080/api/maps/512/698.082/jpeg/30`)
        .then(res => {
          dispatch(setMapTwo(res.data.imageData))
        })

    }
    if (imageTwo && imageOne) {
      const contextOne = canvasImageOne.current.getContext("2d");
      const contextTwo = canvasImageTwo.current.getContext("2d");
      imageCanOne.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageOne.data)
      imageCanOne.onload = () => {
        contextOne.drawImage(imageCanOne, 0, 0, 500, 500);
      }

      imageCanTwo.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageTwo.data)
      imageCanTwo.onload = () => {
        contextTwo.drawImage(imageCanTwo, 0, 0, 500, 500);
      };
      setIndex(2)

    }
  }, [index, imageOne, imageTwo, dispatch, imageCanOne, imageCanTwo])

  const fetchTwoRandomImage = () => {
    setLoading(true)
    let imageOneRes;
    axios.get(`http://localhost:8080/api/maps/512/698.082/jpeg/30`)
      .then(res => {
        imageOneRes = res;
      }).catch(e => console.log(e)).finally(() => {
        dispatch(setMapTwo(imageOneRes.data.imageData))
      }
      )
    let imageTwoRes;
    axios.get(`http://localhost:8080/api/maps/512/698.082/jpeg/30`)
      .then(res => {
        imageTwoRes = res;
      }).catch(e => console.log(e)).finally(() => {
        dispatch(setMapOne(imageTwoRes.data.imageData))
        setLoading(false)
        setIndex(1)
      }
      )


    const contextOne = canvasImageOne.current.getContext("2d");
    const contextTwo = canvasImageTwo.current.getContext("2d");
    imageCanOne.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageOne.data)
    imageCanTwo.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageTwo.data)
    loadImage(contextOne, imageCanOne)
    loadImage(contextTwo, imageCanTwo)
  }
  const arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };


  const brightnessUp = () => {
    setBrightness((brightness / 10) + brightness)
    canvasImageOne.current.getContext("2d").filter = `brightness(${(brightness / 10) + brightness}%)`;
    canvasImageTwo.current.getContext("2d").filter = `brightness(${(brightness / 10) + brightness}%)`;
    const contextOne = canvasImageOne.current.getContext("2d");
    const contextTwo = canvasImageTwo.current.getContext("2d");
    imageCanOne.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageOne.data)
    imageCanTwo.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageTwo.data)
    loadImage(contextOne, imageCanOne)
    loadImage(contextTwo, imageCanTwo)
    setIndex(1)
  }


  const brightnessDown = () => {
    setBrightness(brightness - (brightness / 10))
    canvasImageOne.current.getContext("2d").filter = `brightness(${brightness - (brightness / 10)}%)`;
    canvasImageTwo.current.getContext("2d").filter = `brightness(${brightness - (brightness / 10)}%)`;
    const contextOne = canvasImageOne.current.getContext("2d");
    const contextTwo = canvasImageTwo.current.getContext("2d");
    imageCanOne.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageOne.data)
    imageCanTwo.src = "data:image/jpeg;base64," + arrayBufferToBase64(imageTwo.data)
    loadImage(contextOne, imageCanOne)
    loadImage(contextTwo, imageCanTwo)
    setIndex(1)
  }

  const loadImage = (contextNum, imageCan) => {
    imageCan.onload = () => {
      contextNum.drawImage(imageCan, 0, 0, 500, 500);
    };
  }


  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ margin: '10px' }}>
        <Button disabled={loading} onClick={() => brightnessUp()} variant="outlined" color='success'>Brightness +10%</Button>
        <Button disabled={loading} onClick={() => brightnessDown()} variant="outlined" color='error'>Brightness -10%</Button>
        <Button disabled={loading} onClick={() => { fetchTwoRandomImage() }} variant="outlined">{loading ? 'Loading images' : 'Replace Images'}</Button>
        {loading && <CircularProgress style={{ marginLeft: '10px' }} size={25} />}
      </div>
      {<CanvasJSX canRef={canvasImageOne} />}
      {<CanvasJSX canRef={canvasImageTwo} />}
    </div >
  );
}

