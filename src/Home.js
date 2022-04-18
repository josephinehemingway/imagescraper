import React, { useState } from 'react'
import './Home.css'
import { Input, InputNumber, Select } from 'antd';
import { ContentContainer, RowContainer, StyledRow } from './components/Styles';
import { DownloadButton } from './components/Button';
import Image from './components/images';

const { Search } = Input;
const { Option } = Select;

const images = [
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
      }
  ]

function Home() {

    const onSearch = value => console.log(value);

    const gallery = images.map(im=> (
        <Image
            key={im.url}
            // hoverable
            // bodyStyle={{ padding: "5px", width: "100%", align: "center" }}
            width={200}
            src={im.url}
        />
    ));

    return (
        <body style={{marginTop: "5em", marginBottom: "2em"}}>
            <ContentContainer alignitems="center" >

                <header>
                    <div className="head-text">
                        <h1 className="title">Image Scraper</h1>
                    </div>
                </header>
                <RowContainer justifycontent="center" marginbottom="1em">
                    
                        <InputNumber style={{ width: '8%'}}
                                placeholder="no. of queries" 
                                defaultValue="10" 
                                size='large'
                                step={10}
                                min={0}
                                max={500}/>
                        <Select defaultValue="Single" size='large'>
                            <Option value="Single">Single</Option>
                            <Option value="Multiple">Multiple</Option>
                        </Select>
                        
                </RowContainer> 
                    
                        <Search placeholder="input search text" 
                                allowClear 
                                onSearch={onSearch}
                                size="large" 
                                style={{ borderRadius: '5px', width: '35%',  marginBottom: "1.5em"}} />
                    <DownloadButton>Download</DownloadButton>
            
                {/* // Add selector for number of results
                // Add button to download
                // Add button to select all
                 */}
               

            </ContentContainer>
            {gallery}
            {/* <HorizontalScroll>
                {gallery}
            </HorizontalScroll> */}
            
        </body>
    )
}

export default Home;