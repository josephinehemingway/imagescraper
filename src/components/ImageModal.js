import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { isEmpty } from "lodash";
import { UtilityButton } from './Button';



const ImageModal = ({ image, isModalVisible, handleClose, imgArray }) => {
    const [selectedImage, setSelectedImage] = useState(image)
    const [isEnd, setIsEnd] = useState(false)
    const [isStart, setIsStart] = useState(false)

    const handleCloseModal = () => {
      handleClose()
      setSelectedImage(image)
      console.log('closemodal image', image)
      console.log('closemodal selected', selectedImage)
    }

    useEffect(() => {
        if (image && !isEmpty(imgArray)) {
          const pos = imgArray.indexOf(image)
          checkIfStartOrEnd(pos)
        }
    }, [image, imgArray])

    const checkIfStartOrEnd = (pos) => {
        const tempIsEnd =
            imgArray.length === 1 || pos === imgArray.length - 1 ? true : false
        const tempIsStart = imgArray.length === 1 || pos === 0 ? true : false

        setIsEnd(tempIsEnd)
        setIsStart(tempIsStart)
    }

    const handleNext = () => {
        const pos = imgArray.indexOf(selectedImage)
        console.log('pos', pos)
        console.log('cur', selectedImage)
        checkIfStartOrEnd(pos + 1)

        if (pos !== imgArray.length - 1) {
            setSelectedImage(imgArray[pos + 1])
        }
    }

    const handlePrevious = () => {
        const pos = imgArray.indexOf(selectedImage)
        checkIfStartOrEnd(pos - 1)
        console.log('pos', pos)
        console.log('cur', selectedImage)

        if (pos !== 0) {
            setSelectedImage(imgArray[pos - 1])
        }
    }

    const generateFooter = () => {
        return (
          <span>
            <UtilityButton
              key='previous'
              size='medium'
              type='primary'
              onClick={handlePrevious}
              disabled={isStart}
            >
              Previous
            </UtilityButton>
            <UtilityButton
              key='next'
              size='medium'
              type='primary'
              onClick={handleNext}
              disabled={isEnd}
            >
              Next
            </UtilityButton>
          </span>
        )
      }


    return (
        <Modal
            visible={isModalVisible}
            onCancel={handleCloseModal}
            centered
            footer={imgArray.length === 1 ? null : generateFooter()}
        >
            {/* <img 
                // data-tip={im.title}
                // data-for={"images"}
                src={selectedImage.src}
                alt={selectedImage.title}
                height={'300px'}
                width={'300px'}
            /> */}

        </Modal>
    )
}

export default ImageModal;