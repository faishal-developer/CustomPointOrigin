import React, { useEffect, useState } from 'react';
import { addQueryParams, stickyPosition } from '../../../helper/CommonFunction';
import FontAwesome, { iconList } from '../../FontAwesome/FontAwesome';
import { useLocation, useNavigate } from 'react-router-dom';
import useMainBox from '../MainBox.presenter';

const keyword=["keyring","portrait","dim light","pen holder","giftbox","crest","Name Plate","3d","Cloth","laser"];
const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTxt,setSearchTxt] = useState('');
    const { handleSearch ,handleChange} = useMainBox();

    useEffect(()=>{
        stickyPosition("search_bar", "p_sticky0")
    },[])
    return (
        <div  className='search_bar'>
            <div>
                <div id="search_bar" className='search'>
                    <input 
                        type="text" 
                        value={searchTxt} 
                        onChange={(e) => handleChange(e,setSearchTxt)}
                        onKeyDown={handleSearch}
                    />
                    <span className='src_btn' onClick={()=>handleSearch(false,searchTxt)}>
                        <FontAwesome icon={iconList.search} />
                    </span>
                    <span className='drop_down'></span>
                </div>
                {
                    keyword.length>=1? (
                        <div className='keyword'>
                            {
                                keyword?.map((el, i) => (
                                    <p 
                                        key={i}
                                        onClick={() => addQueryParams(navigate,location,{key:'key',value:el})}
                                    >
                                        {el}
                                    </p>
                                ))
                            }
                        </div>
                    ):null
                }
            </div>
        </div>
    );
};

export default SearchBar;