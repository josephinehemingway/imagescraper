import React, { useEffect, useState } from 'react'
import './Home.css'
import { Input, InputNumber } from 'antd';
import { ContentContainer, RowContainer, StyledRow } from './components/Styles';
import { UtilityButton } from './components/Button';
import { DownloadOutlined } from '@ant-design/icons';


const { Search } = Input;

const imagesReceived = [
    {
        url: 'https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg',
        source: 'https://www.bbcgoodfood.com/howto/guide/health-benefits-bananas',
        title: 'The health benefits of bananas | BBC Good Food'
    },
    {
        url: 'https://th-thumbnailer.cdn-si-edu.com/4Nq8HbTKgX6djk07DqHqRsRuFq0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg',
        source: 'https://www.smithsonianmag.com/science-nature/building-a-better-banana-70543194/',
        title: 'Building A Better Banana | Science| Smithsonian Magazine'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Cavendish_Banana_DS.jpg',
        source: 'https://en.wikipedia.org/wiki/Cavendish_banana',
        title: 'Cavendish banana - Wikipedia'
    },
    {
        url: 'https://www.nipponexpress.com/press/report/img/06-Nov-20-ogp.jpeg',
        source: 'https://www.nipponexpress.com/press/report/06-Nov-20.html',
        title: 'The Global Supply Chain of Bananas - from farms to your table | NIPPON  EXPRESS'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
        source: 'https://en.wikipedia.org/wiki/Banana',
        title: 'Banana - Wikipedia'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/1200px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
        source: 'https://en.wikipedia.org/wiki/Strawberry',
        title: 'Strawberry - Wikipedia'
    },
    {
        url: 'https://www.crodapersonalcare.com/croda_image_downloads.ashx?fn=Personalcare_0_strawberry-shutterstock_771314446.jpg&mn=personalcare&w=768&xr=0&yr=0&xfp=6&yfp=6&hash=FDA6E5C93BDE278AA0B30F90EF2A401519C138999FEC74AA&t=7',
        source: 'https://www.crodapersonalcare.com/en-gb/product-finder/product/2766-strawberry_1_extract_1_pb',
        title: 'Strawberry Extract PB | Personal Care'
    },
    {
        url: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320894/strawberry-on-white-background-to-represent-strawberry-tongue.jpg',
        source: 'https://www.medicalnewstoday.com/articles/320894',
        title: 'Strawberry tongue: Causes, symptoms, and treatment'
    },
    {
        url: 'https://cdn.britannica.com/22/75922-050-D3982BD0/flowers-fruits-garden-strawberry-plant-species.jpg',
        source: 'https://www.britannica.com/plant/strawberry',
        title: 'strawberry | Description, Cultivation, Nutrition, Uses, Species, & Facts |  Britannica'
    },
    {
        url: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/07/ripe-red-strawberries.jpg',
        source: 'https://www.gardeningknowhow.com/edible/fruits/strawberry/strawberry-plant-types.htm',
        title: 'Types Of Strawberry Plants - Information About Different Strawberries In  The Garden'
    },
    {
        url: 'https://www.macmillandictionary.com/external/slideshow/full/160279_full.jpg',
        source: 'https://www.macmillandictionary.com/dictionary/british/strawberry',
        title: 'STRAWBERRY (noun) definition and synonyms | Macmillan Dictionary'
    },
    {
        url: 'https://foodal.com/wp-content/uploads/2015/03/Make-Strawberry-Season-Last-All-Year.jpg',
        source: 'https://foodal.com/knowledge/things-that-preserve/make-strawberry-season-last-all-year/',
        title: 'How to Choose, Use, and Store Fresh Strawberries - Foodal'
    },
    {
        url: 'https://post.healthline.com/wp-content/uploads/2020/09/AN295-Strawberries-In-Hands-732x549-thumb.jpg',
        source: 'https://www.healthline.com/nutrition/foods/strawberries',
        title: 'Strawberries 101: Nutrition Facts and Health Benefits'
    },
    {
        url: 'https://solidstarts.com/wp-content/uploads/introducing-strawberries-to-babies-480x320.jpg',
        source: 'https://solidstarts.com/foods/strawberry/',
        title: 'Strawberries for Babies - First Foods for Baby - Solid Starts'
    },
    {
        url: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/1432664914-strawberry-facts1.jpg',
        source: 'https://www.countryliving.com/food-drinks/a35552/facts-about-strawberries/',
        title: 'Strawberry Facts - Fun Facts About Strawberries'
    }
]

const Home = () => {

    const onSearch = value => console.log(value);
    const [queryLimit, setQueryLimit] = useState(10);
    const [allSelected, setAllSelected] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState([])


    useEffect(() => {
        let imageList = [];
        imagesReceived.forEach((el, i) => {
            imageList.push({ id: i, src: el.url, selected: false, title: el.title })
        });
        setImages(imageList);
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

    const onImageClick = id => {
        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.selected = !img.selected;
            }
        }
        setImages(imageList);
    }

    const handleLimitChange = (e) => {
        setQueryLimit(e);
        console.log(e);
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
        <img key={i}
            data-tip={im.title}
            data-for={"images"}
            src={im.src}
            alt={im.title}
            height={200}
            className={im.selected ? "selected" : "imgPicker"}

            onClick={() => onImageClick(im.id)} />
    ));

    return (
        <body style={{ marginTop: "5em", marginBottom: "2em" }}>
            <ContentContainer alignitems="center" >

                <header>
                    <div className="head-text">
                        <h1 className="title">Image Scraper</h1>
                    </div>
                </header>
                <RowContainer justifycontent="center" marginbottom="1em">
                    <div className='label' style={{ height: 40, marginRight: '0.5em' }}>
                        Result Limit:
                    </div>
                    <InputNumber style={{ width: '8%', marginRight: "1em" }}
                        placeholder="query limit"
                        value={queryLimit.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                        })}
                        onChange={handleLimitChange}
                        size='large'
                        step={10}
                        min={0}
                        max={500}
                    />
                    {/* <Select defaultValue="Single" size='large'>
                            <Option value="Single">Single</Option>
                            <Option value="Multiple">Multiple</Option>
                        </Select> */}

                    <Search placeholder="Input search text"
                        allowClear
                        onSearch={onSearch}
                        size="large"
                        style={{ borderRadius: '5px', width: '35%', marginBottom: "1.5em" }} />
                </RowContainer>




                {/* // Add selector for number of results
                // Add button to download
                // Add button to select all
                 */}


            </ContentContainer>
            <div className="gallery"
                style={{
                    marginRight: "2em",
                    marginLeft: "2em",
                    paddingBottom: "2em"
                }}>
                <RowContainer justifycontent="end" marginbottom="1em">
                    {allSelected ?
                        <UtilityButton
                            type='alt'
                            onClick={handleSelectAll}
                        >Unselect All</UtilityButton>
                        : <UtilityButton
                            type='primary'
                            onClick={handleSelectAll}
                        >Select All</UtilityButton>
                    }
                    <UtilityButton
                        type = 'primary'
                        width="160"
                        icon={<DownloadOutlined />}
                        onClick={handleDownload}
                        disabled={images.filter(im => im.selected === true).length === 0}
                    >Download ({images.filter(im => im.selected === true).length})</UtilityButton>
                </RowContainer>
                {gallery}
            </div>

        </body>
    )
}

export default Home;