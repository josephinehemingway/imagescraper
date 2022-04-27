import React, { useEffect, useState } from 'react'
import './Home.css'
import { Empty, InputNumber, Spin, Select } from 'antd';
import { CheckboxUnselected, ContentContainer, RowContainer, SearchBar } from './components/Styles';
import { UtilityButton } from './components/Button';
import { FilterOutlined, CheckCircleTwoTone, LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
// import blankImg from './assets/blankimage.PNG';

const { Option } = Select;

//https://github.com/Daym3l/react-gallery-picker/blob/cf4d68cb02777b2f522bcfde4149a38e77bf9887/src/index.js

const Home = () => {

    const [images, setImages] = useState([])
    const [queryLimit, setQueryLimit] = useState(10);
    const [allSelected, setAllSelected] = useState(false);
    const [imgSize, setImgSize] = useState("175vmin");
    const [selectedSize, setSelectedSize] = useState('167vmin');
    const [imgRes, setImgRes] = useState('');
    const [license, setLicense] = useState('');
    const [filetype, setFiletype] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLightboxVisible, setLightboxVisibility] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [imagesReceived, setImagesReceived] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        let electron = window.require('electron');
        if (electron) {
            electron.ipcRenderer.on('result', (event, msg) => {
                console.log('got reply:', msg);
                setImagesReceived(JSON.parse(msg))

                setIsLoading(false)
            });
        }
    }, [])

    useEffect(() => {
        let imageList = [];
        imagesReceived.forEach((el, i) => {
            const img = new Image();
            img.src = el.url;
            imageList.push({ id: i, src: el.url, selected: false, title: el.title, error: false })
        });
        setImages(imageList);
    }, [imagesReceived])

    useEffect(() => {
        // console.log(images.filter(im => im.error === false))
        if (!isEmpty(images) & (images.filter(im => im.error === false)).every(im => im.selected === true)) {
            setAllSelected(true)
        } else {
            setAllSelected(false)
        }
    }, [images])
    
    useEffect(()=> {
        console.log(images)
    }, [images])

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

    const handleResChange = (e) => {
        setImgRes(e)

        // Trigger search on change of image resolution
        if (searchTerm !== '') {
            let electron = window.require('electron');
            if (electron) electron.ipcRenderer.send("msg", {
                payload: {
                    searchTerm: searchTerm,
                    limit: queryLimit,
                    size: e,
                    license: license,
                    filetype: filetype,
                }
            });

            setIsLoading(true)
        } else {
            setImages([])
            setImagesReceived([])
            setAllSelected(false)
            setSearchTerm('');
        }
    }

    const handleTypeChange = (e) => {
        setFiletype(e)

        // Trigger search on change of image file type
        if (searchTerm !== '') {
            let electron = window.require('electron');
            if (electron) electron.ipcRenderer.send("msg", {
                payload: {
                    searchTerm: searchTerm,
                    limit: queryLimit,
                    size: imgRes,
                    license: license,
                    filetype: e,
                }
            });

            setIsLoading(true)
        } else {
            setImages([])
            setImagesReceived([])
            setAllSelected(false)
            setSearchTerm('');
        }
    }


    const handleLicenseChange = (e) => {
        setLicense(e)

        // Trigger search on change of image license
        if (searchTerm !== '') {
            let electron = window.require('electron');
            if (electron) electron.ipcRenderer.send("msg", {
                payload: {
                    searchTerm: searchTerm,
                    limit: queryLimit,
                    size: imgRes,
                    license: e,
                    filetype: filetype,
                }
            });

            setIsLoading(true)
        } else {
            setImages([])
            setImagesReceived([])
            setAllSelected(false)
            setSearchTerm('');
        }
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
                    limit: queryLimit,
                    size: imgRes,
                    license: license,
                    filetype: filetype,
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
        let electron = window.require('electron');
        if (electron) electron.ipcRenderer.send("download", {
            payload: {
                selected: images.filter(im => im.selected === true && im.error === false),
                searchTerm: searchTerm
            }
        });
    }

    const handleError = (e, id) => {
        // e.target.parentElement.style.display = 'none'

        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.error = !img.error;
            }
        }
        setImages(imageList.filter(im => im.error === false));
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
                referrerpolicy="no-referrer"
                onError={(e) => handleError(e, im.id)}
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
                    Found {images.filter(im => im.error === false).length} results for search term "{searchTerm}"
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
                            disabled={isEmpty(images)}
                        >{allSelected ? 'Unselect All' : 'Select All'}</UtilityButton>

                        <UtilityButton
                            type='primary'
                            onClick={handleDownload}
                            disabled={images.filter(im => im.selected === true).length === 0}
                        >Download ({images.filter(im => im.selected === true && im.error === false).length})</UtilityButton>
                    </div>
                </RowContainer>

                <div id='filter' style={{ width: "90%" }}>
                    <RowContainer id="expand-contract" justifycontent="flex-start" marginright='0px' className={isFilterOpen ? 'expanded' : ''} >
                        <ContentContainer width="230px" >
                            <div className='sublabel'>Image Size:</div>
                            <Select
                                placeholder="Select Image Size"
                                value={imgRes}
                                style={{ width: '200px' }}
                                onChange={handleResChange}
                            >
                                <Option value="">Any Size</Option>
                                <Option value="isz:m">Medium</Option>
                                <Option value="isz:l">Large</Option>
                                <Option value="isz:lt,islt:qsvga">Larger than 400x300</Option>
                                <Option value="isz:lt,islt:vga">Larger than 640x480</Option>
                                <Option value="isz:lt,islt:svga">Larger than 800x600</Option>
                                <Option value="isz:lt,islt:xga">Larger than 1024x768</Option>
                            </Select>
                        </ContentContainer>
                        <ContentContainer width="265px" >
                            <div className='sublabel'>License:</div>
                            <Select
                                placeholder="Select License"
                                value={license}
                                style={{ width: '235px' }}
                                onChange={handleLicenseChange}
                            >
                                <Option value="">All</Option>
                                <Option value="il:cl">Creative Commons License</Option>
                                <Option value="il:ol">Commercial and Other License</Option>
                            </Select>
                        </ContentContainer>
                        <ContentContainer width="130px" >
                            <div className='sublabel'>File Types:</div>
                            <Select
                                placeholder="Select File Type"
                                value={filetype}
                                style={{ width: '100px' }}
                                onChange={handleTypeChange}
                            >
                                <Option value="">All</Option>
                                <Option value="ift:jpg">JPG</Option>
                                <Option value="ift:png">PNG</Option>
                            </Select>
                        </ContentContainer>
                        <ContentContainer width="150px">
                            <div className='sublabel'>
                                Result Limit:
                            </div>
                            <InputNumber style={{ width: '100px' }}
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

                    </RowContainer>
                </div>
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