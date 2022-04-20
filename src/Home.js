import React, { useEffect, useState } from 'react'
import './Home.css'
import { Input, InputNumber, Radio } from 'antd';
import { CheckboxUnselected, ContentContainer, RowContainer } from './components/Styles';
import { UtilityButton } from './components/Button';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { imagesReceived } from './utils';

//https://github.com/Daym3l/react-gallery-picker/blob/cf4d68cb02777b2f522bcfde4149a38e77bf9887/src/index.js

const { Search } = Input;

// const fs = window.require('fs')
// const pathModule = window.require('path')
// const { app } = window.require('@electron/remote')

const Home = () => {

    const [images, setImages] = useState([])
    const [queryLimit, setQueryLimit] = useState(10);
    const [allSelected, setAllSelected] = useState(false);
    const [imgSize, setImgSize] = useState("200vmin")
    const [selectedSize, setSelectedSize] = useState('192vmin')
    const [searchTerm, setSearchTerm] = useState('')
    // const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        let imageList = [];
        imagesReceived.forEach((el, i) => {
            imageList.push({ id: i, src: el.url, selected: false, title: el.title })
        });
        setImages(imageList);

        let electron = window.require('electron');
        if (electron) {
            electron.ipcRenderer.on('result', (event, msg) => {
                console.log('got reply:', msg);
            });
        }
    }, [])

    // useEffect(() => {
    //     console.log(allSelected)
    //     if (images.filter(im => im.selected == true).length == images.length){
    //         setAllSelected(true)
    //     } else {
    //         setAllSelected(false)
    //     }
    // }, [])

    // useEffect(() => {
    //     returnImages(images)
    // }, [images])

    const onCheckboxClick = id => {
        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.selected = !img.selected;
            }
        }
        setImages(imageList);
    }

    const onImageClick = id => {

    }

    const handleLimitChange = (e) => {
        setQueryLimit(e);
    }

    const handleSizeChange = (e) => {
        setImgSize(e.target.value[0])
        setSelectedSize(e.target.value[1])
    }

    const onSearch = (value) => {
        console.log(value);
        setSearchTerm(value);
        console.log('window.electron', window.electron)
        let electron = window.require('electron');
        if (electron) electron.ipcRenderer.send("msg", "hello & search "+ value);
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
            />

            {im.selected ?
                <CheckCircleTwoTone
                    style={{ fontSize: '25px' }}
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
        <body style={{ marginTop: "3em", marginBottom: "2em" }}>
            <ContentContainer alignitems="center" >
                <header>
                    <div className="head-text">
                        <h1 className="title">Image Scraper</h1>
                    </div>
                </header>
                <RowContainer justifycontent="center" marginbottom="0em">
                    <div className='label' style={{ height: 40, marginRight: '0.5em' }}>
                        Result Limit:
                    </div>
                    <InputNumber style={{ width: '8%', marginRight: "1em" }}
                        placeholder="Query limit"
                        value={queryLimit}
                        precision={0}
                        onChange={handleLimitChange}
                        size='large'
                        step={10}
                        min={0}
                        max={500}
                        allowClear={false}
                    />

                    <Search placeholder="Input search text"
                        allowClear
                        onSearch={onSearch}
                        size="large"
                        style={{ borderRadius: '5px', width: '35%', marginBottom: "1.5em" }} />
                </RowContainer>
                <div className='sublabel'>
                    Found {images.length} results for search term "{searchTerm}"
                </div>
            </ContentContainer>

            <ContentContainer alignitems="center" style={{ width: "80%" }}>
                <RowContainer style={{ width: "90%" }} alignitems="center" justifycontent="space-between" marginbottom="1em" marginright="0px">
                    <div className='sublabel' >
                        Image Size:
                        <Radio.Group value={imgSize} onChange={handleSizeChange} style={{ marginLeft: '10px' }}>
                            <Radio.Button key={'large'} value={["250vmin", "242vmin"]}>Large</Radio.Button>
                            <Radio.Button key={'default'} value={["200vmin", "192vmin"]}>Default</Radio.Button>
                            <Radio.Button key={'small'} value={["150vmin", "142vmin"]}>Small</Radio.Button>
                        </Radio.Group>
                    </div>
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
                <div className="gallery"
                    style={{
                        paddingBottom: "2em"
                    }}>

                    {gallery}
                </div>

            </ContentContainer>
        </body>
    )
}

export default Home;