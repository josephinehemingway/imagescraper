import React, { useEffect, useState } from 'react'
import './Home.css'
import { Empty, Input, InputNumber, Radio, Spin } from 'antd';
import { CheckboxUnselected, ContentContainer, RowContainer, SearchBar } from './components/Styles';
import { UtilityButton } from './components/Button';
import { FilterOutlined, CheckCircleTwoTone, LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEmpty, set } from 'lodash';

//https://github.com/Daym3l/react-gallery-picker/blob/cf4d68cb02777b2f522bcfde4149a38e77bf9887/src/index.js

const { Search } = Input;

const Home = () => {

    const [images, setImages] = useState([])
    const [queryLimit, setQueryLimit] = useState(10);
    const [allSelected, setAllSelected] = useState(false);
    const [imgSize, setImgSize] = useState("200vmin")
    const [selectedSize, setSelectedSize] = useState('192vmin')
    const [searchTerm, setSearchTerm] = useState('')
    const [isLightboxVisible, setLightboxVisibility] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [imagesReceived, setImagesReceived] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        let electron = window.require('electron');
        if (electron) {
            electron.ipcRenderer.on('result', (event, msg) => {
                console.log('got reply:', msg);
                setImagesReceived(JSON.parse(msg))
                console.log(imagesReceived)
                setIsLoading(false)
            });
        }
    }, [])

    useEffect(() => {
        let imageList = [];
        imagesReceived.forEach((el, i) => {
            imageList.push({ id: i, src: el.url, selected: false, title: el.title })
        });
        setImages(imageList);
    }, [imagesReceived])

    // useEffect(() => {
    //     console.log(allSelected)
    //     if (images.filter(im => im.selected == true).length == images.length){
    //         setAllSelected(true)
    //     } else {
    //         setAllSelected(false)
    //     }
    // }, [])

    const onFilterClick = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const onCheckboxClick = id => {
        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.selected = !img.selected;
            }
        }
        setImages(imageList);
    }

    const handleOpenLightbox = image => {
        // open image modal
        setLightboxVisibility(true)
        setSelectedImage(image)
    }

    const handleCloseLightbox = () => {
        setLightboxVisibility(false)
    }

    const showNext = (e) => {
        e.stopPropagation()
        let currentIndex = images.indexOf(selectedImage)
        if (currentIndex >= images.length - 1) {
            setLightboxVisibility(false)
        }
        else {
            let nextImage = images[currentIndex + 1]
            setSelectedImage(nextImage)
        }
    }

    const showPrev = (e) => {
        e.stopPropagation()
        let currentIndex = images.indexOf(selectedImage)
        if (currentIndex <= 0) {
            setLightboxVisibility(false)
        }
        else {
            let nextImage = images[currentIndex - 1]
            setSelectedImage(nextImage)
        }
    }

    const handleLimitChange = (e) => {
        setQueryLimit(e);
    }

    const handleSizeChange = (e) => {
        setImgSize(e.target.value[0])
        setSelectedSize(e.target.value[1])
    }

    const onSearch = (value) => {
        console.log('search: ', value, ',', queryLimit);

        if (value !== '') {
            setSearchTerm(value);
            console.log('window.electron', window.electron)
            let electron = window.require('electron');
            if (electron) electron.ipcRenderer.send("msg", {
                payload: { 
                    searchTerm: value,
                    limit: queryLimit
                }
                });

            setIsLoading(true)
        } else {
            setImages([])
            setImagesReceived([])
            setAllSelected(false)
            setSearchTerm(value);
        }
    }

    const handleSelectAll = () => {
        let imageList = [...images];

        if (!allSelected) {
            for (const img of imageList) {
                img.selected = true;
                setAllSelected(true)
            }
        } else {
            for (const img of imageList) {
                img.selected = false;
                setAllSelected(false)
            }
        }

        setImages(imageList);
    }

    const handleDownload = () => {
        console.log(images.filter(im => im.selected === true))
        // if (electron) electron.ipcRenderer.send("msg", {
        //     payload: { 
        //         searchTerm: value,
        //         limit: queryLimit
        //     }
        // });
        // open file explorer - to select download location
        // download images into local directory
        // download as a zip?
    }

    const gallery = images.map((im, i) => (
        <div className={im.selected ? "selected" : "imgPicker"}>

            <img key={i}
                data-tip={im.title}
                data-for={"images"}
                src={im.src}
                alt={im.title}
                height={im.selected ? selectedSize : imgSize}
                width={im.selected ? selectedSize : imgSize}
                onClick={() => handleOpenLightbox(im)}
            />

            {im.selected ?
                <CheckCircleTwoTone
                    style={{ fontSize: '35px' }}
                    onClick={() => onCheckboxClick(im.id)}
                    twoToneColor="#52c41a"
                />
                : <CheckboxUnselected
                    onClick={() => onCheckboxClick(im.id)}
                />
            }
        </div>
    ));

    return (
        <body style={{ marginTop: "5em", marginBottom: "2em" }}>
            <div className='header' />

            <ContentContainer alignitems="center" >
                <header>
                    <div className="head-text">
                        <h1 className="title">Image Scraper</h1>
                    </div>
                </header>
                <RowContainer justifycontent="center" marginbottom="0em">
                    <SearchBar placeholder="Input search text"
                        allowClear
                        onSearch={onSearch}
                        size="large"
                        style={{ width: '45%', marginLeft: '3%', marginBottom: "1.5em" }}
                        loading={isLoading}
                        enterButton />
                </RowContainer>
                {!isLoading && !isEmpty(searchTerm) ? <div className='sublabel'>
                    Found {images.length} results for search term "{searchTerm}"
                </div>
                    : ''
                }
            </ContentContainer>

            <ContentContainer alignitems="center" style={{ width: "80vw" }}>
                <RowContainer style={{ width: "90%" }} alignitems="center" justifycontent="space-between" marginbottom="1em" marginright="0">
                    <UtilityButton
                        type={'alt'}
                        onClick={onFilterClick}
                        width={'4vw'}
                        marginleft={'0'}
                        icon={<FilterOutlined />}
                    >Filters</UtilityButton>
                    <div>
                        <UtilityButton
                            type={allSelected ? 'alt' : 'primary'}
                            onClick={handleSelectAll}
                        >{allSelected ? 'Unselect All' : 'Select All'}</UtilityButton>

                        <UtilityButton
                            type='primary'
                            onClick={handleDownload}
                            disabled={images.filter(im => im.selected === true).length === 0}
                        >Download ({images.filter(im => im.selected === true).length})</UtilityButton>
                    </div>
                </RowContainer>
                {isFilterOpen &&
                // add filter file types, file size
                    <RowContainer justifycontent="flex-start" style={{ width: "90%" }} >
                        <ContentContainer width="250px" >
                            <div className='sublabel'>Image Size:</div>
                            <Radio.Group value={imgSize} onChange={handleSizeChange}>
                                <Radio.Button key={'large'} value={["250vmin", "242vmin"]}>Large</Radio.Button>
                                <Radio.Button key={'default'} value={["200vmin", "192vmin"]}>Default</Radio.Button>
                                <Radio.Button key={'small'} value={["150vmin", "142vmin"]}>Small</Radio.Button>
                            </Radio.Group>
                        </ContentContainer>
                        <ContentContainer width="150px">
                            <div className='sublabel'>
                                Result Limit:
                            </div>
                            <InputNumber style={{ width: '100px'}}
                                placeholder="Query limit"
                                value={queryLimit}
                                precision={0}
                                onChange={handleLimitChange}
                                size='default'
                                step={10}
                                min={0}
                                max={500}
                                allowClear={false}
                            />
                        </ContentContainer>

                    </RowContainer>}
                <div className="gallery"
                    style={{
                        paddingBottom: "2em"
                    }}>

                    {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        : !isEmpty(images) ? gallery
                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: '5em' }} />}
                </div>
                {
                    isLightboxVisible ?
                        <div id="lightbox" onClick={handleCloseLightbox}>
                            <LeftOutlined style={{ fontSize: '50px', color: 'white', marginLeft: '20vmin' }}
                                onClick={showPrev} />
                            {/* <ContentContainer alignitems="center"> */}
                            <img id={selectedImage.id} src={selectedImage.src} alt={selectedImage.title} className='modal' />
                            {/* <div className='caption' style={{ width: '70%'}}>
                                    {selectedImage.title}
                                </div> */}
                            {/* </ContentContainer>  */}
                            <RightOutlined style={{ fontSize: '50px', color: 'white', marginRight: '20vmin' }} onClick={showNext} />
                        </div> : ''
                }

            </ContentContainer>
        </body>
    )
}

export default Home;