import React, { useEffect, useState } from 'react'
import './Home.css'
import { Input, InputNumber, Radio } from 'antd';
import { ContentContainer, RowContainer } from './components/Styles';
import { UtilityButton } from './components/Button';
import { DownloadOutlined, CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';


//https://github.com/Daym3l/react-gallery-picker/blob/cf4d68cb02777b2f522bcfde4149a38e77bf9887/src/index.js


const { Search } = Input;

const imagesReceived = [
    {
        url: 'https://images.theconversation.com/files/295442/original/file-20191003-52796-1763ajl.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
        source: 'https://theconversation.com/literature-sheds-light-on-the-history-and-mystery-of-the-southern-ocean-122664',
        title: 'Literature sheds light on the history and mystery of the Southern Ocean'
    },
    {
        url: 'https://images.theconversation.com/files/223729/original/file-20180619-126566-1jxjod2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
        source: 'https://theconversation.com/curious-kids-how-was-the-ocean-formed-where-did-all-the-water-come-from-98382',
        title: 'Curious Kids: How was the ocean formed? Where did all the water come from?'
    },
    {
        url: 'https://media.nationalgeographic.org/assets/photos/380/216/1c9ab248-0c9c-413d-b0c8-ce8aec56b821.jpg',
        source: 'https://www.nationalgeographic.org/encyclopedia/ocean/',
        title: 'Ocean | National Geographic Society'
    },
    {
        url: 'https://imageio.forbes.com/specials-images/imageserve/6058b1eed388d3a4a0831d09/960x0.jpg?fit=bounds&format=jpg&width=960',
        source: 'https://www.forbes.com/sites/esade/2021/04/15/planet-ocean-why-is-the-blue-economy-so-important/',
        title: 'Planet Ocean: Why Is The Blue Economy So Important?'
    },
    {
        url: 'https://cdn.britannica.com/65/161665-050-C4B1FA75/Waves-North-Shore-Oahu-Hawaiian-Islands.jpg',
        source: 'https://www.britannica.com/story/why-is-the-ocean-salty',
        title: 'Why Is the Ocean Salty? | Britannica'
    },
    {
        url: 'https://www.thoughtco.com/thmb/t8AnhGOqEJEaehpyjAL3yGafxnA=/3439x2579/smart/filters:no_upscale()/GettyImages_482194715-56a1329e5f9b58b7d0bcf666.jpg',
        source: 'https://www.thoughtco.com/why-is-the-ocean-blue-609420',
        title: 'Why Is the Ocean Blue and Sometimes Green?'
    },
    {
        url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ocean-quotes-index-1624414741.jpg',
        source: 'https://www.countryliving.com/life/inspirational-stories/g36808040/ocean-quotes/',
        title: '25 Inspiring Ocean Quotes - Short Quotes about Ocean Waves'
    },
    {
        url: 'https://s3.amazonaws.com/ghost-cms-woi/2021/06/BlueRecovery.jpg',
        source: 'https://ocean.economist.com/governance/articles/life-and-livelihoods-un-to-host-virtual-world-ocean-day',
        title: 'Life and livelihoods: UN to host virtual World Ocean Day - World Ocean  Initiative'
    },
    {
        url: 'https://imageio.forbes.com/specials-images/imageserve/61609bea76e0111d074d178e/Aerial-View-of-Rough-Sea-Waves/960x0.jpg?fit=bounds&format=jpg&width=960',
        source: 'https://www.forbes.com/sites/forbesbusinesscouncil/2021/10/11/how-businesses-can-join-the-ocean-conversation/',
        title: 'How Businesses Can Join The Ocean Conversation'
    },
    {
        url: 'https://www.campusfrance.org/sites/default/files/medias/images/2022-02/Ocean.jpg',
        source: 'https://www.campusfrance.org/en/one-ocean-summit-an-international-summit-to-take-action-together',
        title: 'One Ocean Summit: an international summit to take action together | Campus  France'
    },
    {
        url: 'https://www.clearpointstrategy.com/cdn-cgi/image/width=1280,quality=90,format=auto,onerror=redirect/wp-content/uploads/2018/05/The-Blue-Ocean-Strategy-Summary-With-3-Examples.jpg',
        source: 'https://www.clearpointstrategy.com/blue-ocean-strategy/',
        title: 'The Blue Ocean Strategy Summary (With 4 Examples) - ClearPoint Strategy'
    },
    {
        url: 'https://image.jimcdn.com/app/cms/image/transf/none/path/sa5da3ad6a208eec6/backgroundarea/i056862cfc4b2651d/version/1600946425/image.jpg',
        source: 'https://www.ioinst.org/',
        title: 'IOI - International Ocean Institute - Headquarters'
    },
    {
        url: 'https://i.natgeofe.com/k/cd784533-e5ef-439a-8167-2ba61b0a9a4b/wave_16x9.jpg?w=1200', source: 'https://kids.nationalgeographic.com/nature/habitats/article/ocean',
        title: 'Ocean Habitat facts and photos'
    },
    {
        url: 'https://www.worldatlas.com/r/w1200/upload/32/ed/dd/shutterstock-611361698.jpg',
        source: 'https://www.worldatlas.com/articles/which-ocean-is-the-cleanest.html',
        title: 'Which Ocean is the Cleanest? - WorldAtlas'
    },
    {
        url: 'https://assets.weforum.org/tout/image/responsive_medium_OEZScBGmPdbtDB4ZFdWjh73mBJlHNtksSll1Wixt4Pk.jpg',
        source: 'https://www.weforum.org/events/virtual-ocean-dialogues-2020',
        title: 'Virtual Ocean Dialogues 2020 | World Economic Forum'
    },
    {
        url: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8b2NlYW58ZW58MHx8MHx8&w=1000&q=80',
        source: 'https://unsplash.com/s/photos/ocean',
        title: '20+ Stunning Ocean Pictures [HQ] | Download Free Images on Unsplash'
    },
    {
        url: 'https://static.scientificamerican.com/sciam/cache/file/30647AC1-B772-4607-BF3C3D43456E7103_source.jpg',
        source: 'https://www.scientificamerican.com/article/the-ocean-carries-memories-of-sars-cov-2/',
        title: "The Ocean Carries 'Memories' of SARS-CoV-2 - Scientific American"
    },
    {
        url: 'https://i.natgeofe.com/k/b07ee88b-1291-439b-a139-e0f87c6222ec/hawaiianbeach_4x3.jpg',
        source: 'https://kids.nationalgeographic.com/nature/habitats/article/ocean',
        title: 'Ocean Habitat facts and photos'
    },
    {
        url: 'https://www.surfertoday.com/images/jamp/page/ocean.jpg',
        source: 'https://www.surfertoday.com/environment/things-you-didnt-know-about-the-oceans',
        title: "20 things you didn't know about the oceans"
    },
    {
        url: 'https://www.iisd.org/sites/default/files/styles/og_image/public/2021-05/the-ocean.jpg?itok=pEvwq3qm',
        source: 'https://www.iisd.org/articles/deep-dive/rising-pressures-ocean-governance',
        title: 'The Rising Pressures on Ocean Governance | International Institute for  Sustainable Development'
    },
    {
        url: 'https://assets.weforum.org/article/image/Pyr-_4XKVQ6lcdy2joZSyjS6W_yfPBLfLFkB83UQ0s8.jpg',
        source: 'https://www.weforum.org/agenda/2021/07/how-we-can-inspire-people-connections-ocean/',
        title: 'How we can inspire people to feel connected to the ocean | World Economic  Forum'
    },
    {
        url: 'https://scx2.b-cdn.net/gfx/news/2018/2-ocean.jpg',
        source: 'https://phys.org/news/2021-12-climate-extremes-oceans.html',
        title: 'Climate change is intensifying extremes, even in the oceans'
    },
    {
        url: 'https://am.pictet/-/media/mega/mega-articles/banners/2021/ocean-preservation/blue-ocean-header-cropped.jpg',
        source: 'https://am.pictet/en/globalwebsite/mega/2021/ocean-preservation-with-bertarelli-foundation',
        title: 'Ocean preservation with bertarelli foundation'
    },
    {
        url: 'https://grist.org/fix/wp-content/uploads/sites/3/2021/03/indian-ocean-e1616165376536.jpeg',
        source: 'https://grist.org/fix/marine-protected-areas-oceans-enforcement/',
        title: "The world is rushing to protect our oceans. Let's make sure we're doing it  right. | Fix"
    },
    {
        url: 'https://i.guim.co.uk/img/media/f5108293ddff6c1b5887c80194b9a110d6c13258/0_739_3898_2339/master/3898.jpg?width=1200&quality=85&auto=format&fit=max&s=03b5539c09ce44571b7797df12d56319',
        source: 'https://www.theguardian.com/environment/2020/oct/06/more-than-14m-tonnes-of-plastic-believed-to-be-at-the-bottom-of-the-ocean',
        title: 'More than 14m tonnes of plastic believed to be at the bottom of the ocean |  Environment | The Guardian'
    },
    {
        url: 'https://content.presspage.com/uploads/2379/1920_ocean-sunset-195865.jpg?10000',
        source: 'https://newsroom.tomra.com/the-future-of-the-sea-how-the-ocean-economy-can-fight-plastic-pollution/',
        title: 'How the ocean economy can fight plastic pollution'
    },
    {
        url: 'https://www.pewtrusts.org/-/media/post-launch-images/2021/01/gettyimages581747029jpgmaster/16x9_m.jpg',
        source: 'https://www.pewtrusts.org/research-and-analysis/articles/2021/01/27/the-drive-to-protect-30-percent-of-the-ocean-by-2030',
        title: 'The Drive to Protect 30% of the Ocean by 2030 | The Pew Charitable Trusts'
    },
    {
        url: 'https://progressive.org/downloads/17265/download/Screen%20Shot%202022-03-28%20at%2011.30.02%20AM.png?cb=0f3615039f8f4d1b430d7ab09d5edc70&w=1470',
        source: 'https://progressive.org/magazine/can-the-ocean-save-the-planet-helvarg/',
        title: 'Can the Ocean Save the Planet? - Progressive.org'
    },
    {
        url: 'https://static.scientificamerican.com/sciam/cache/file/BCC3BD1E-5DC0-4843-A841706AE575C694_source.jpg?w=590&h=800&39BBF62E-5F96-4C6A-A59590CCF416DA11',
        source: 'https://www.scientificamerican.com/article/oceans-are-warming-faster-than-predicted/',
        title: 'Oceans Are Warming Faster Than Predicted - Scientific American'
    }
]

// const fs = window.require('fs')
// const pathModule = window.require('path')
// const { app } = window.require('@electron/remote')

const Home = () => {

    const [images, setImages] = useState([])
    const [queryLimit, setQueryLimit] = useState(10);
    const [allSelected, setAllSelected] = useState(false);
    const [imgSize, setImgSize] = useState("200vmin")
    const [selectedSize, setSelectedSize] = useState('192vmin')
    const [checkboxVisible, setCheckboxVisible] = useState('none')
    // const [isLoading, setIsLoading] = useState(false);

    const handleSizeChange = (e) => {
        setImgSize(e.target.value[0])
        setSelectedSize(e.target.value[1])
        console.log(e.target.value)
    }

    useEffect(() => {
        let imageList = [];
        imagesReceived.forEach((el, i) => {
            imageList.push({ id: i, src: el.url, selected: false, title: el.title, hover: false })
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

    const onCheckboxClick = id => {
        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.selected = !img.selected;
            }
        }
        setImages(imageList);
    }

    const onHoverImage = id => {
        let imageList = [...images];
        for (const img of imageList) {
            if (img.id === id) {
                img.hover = !img.hover;
            }
        }
        setImages(imageList);
    }

    const onImageClick = id => {

    }

    const handleLimitChange = (e) => {
        setQueryLimit(e);
        console.log(e);
    }

    // const {ipcRenderer} = require("electron")
    const onSearch = (value) => {
        console.log(value);
        // ipcRenderer.send("msg", "hello")

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
        <div className={im.selected ? "selected" : "imgPicker"}
            onMouseEnter={e => {
                setCheckboxVisible('block')
                console.log(i)
                console.log(im.id)
            }}

            onMouseLeave={e => {
                setCheckboxVisible('none')
            }}>


            <img key={i}
                data-tip={im.title}
                data-for={"images"}
                src={im.src}
                alt={im.title}
                height={im.selected ? selectedSize : imgSize}
                width={im.selected ? selectedSize : imgSize}
            // className={im.selected ? "selected" : "imgPicker"}

            />

            {im.selected ?
                <CheckCircleTwoTone
                    style={{ fontSize: '25px' }}
                    onClick={() => onCheckboxClick(im.id)}
                    twoToneColor="#52c41a"
                />
                : <CheckCircleOutlined
                    style={{ fontSize: '25px', color: 'white', opacity: 0.6, display: checkboxVisible}}
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

                    <Search placeholder="Input search text"
                        allowClear
                        onSearch={onSearch}
                        size="large"
                        style={{ borderRadius: '5px', width: '35%', marginBottom: "1.5em" }} />
                </RowContainer>

            </ContentContainer>

            <ContentContainer alignitems="center" style={{ width: "80%" }}>
                <RowContainer style={{ width: "90%" }} alignitems="center" justifycontent="space-between" marginbottom="1em">
                    <div className='sublabel' >
                        Image Size:
                        <Radio.Group value={imgSize} onChange={handleSizeChange} style={{ marginLeft: '10px' }}>
                            <Radio.Button value={["250vmin", "242vmin"]}>Large</Radio.Button>
                            <Radio.Button value={["200vmin", "192vmin"]}>Default</Radio.Button>
                            <Radio.Button value={["150vmin", "142vmin"]}>Small</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <UtilityButton
                            type={allSelected ? 'alt' : 'primary'}
                            onClick={handleSelectAll}
                        >{allSelected ? 'Unselect All' : 'Select All'}</UtilityButton>

                        <UtilityButton
                            type='primary'
                            // icon={<DownloadOutlined />}
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