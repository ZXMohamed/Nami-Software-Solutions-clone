//*react
import React, { useDeferredValue, useLayoutEffect, useState } from 'react'
//*mui
import { Box, Button, Container, Stack, TextField } from '@mui/material'
//*components
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
//*queries
import { useGetCategoriesQuery } from '../../../redux/server state/projects';
//*hooks
import { useDispatch, useSelector } from 'react-redux';
import useUpdateEffect from '../../../hooks/useupdateeffect';
import { useContent } from '../../../languages/hooks/usecontent';
//*scripts
import { portfolioFilterSliceActions } from '../../../redux/clint state/portfolio';
import { defaultLanguage } from '../../../languages/languagesContext';


export default function ProjectViewFilter({ resetProjectsCash }) {

  return (
    <Box>
        <Container maxWidth="lg">
            <Categories resetProjectsCash={resetProjectsCash}/>
              <br />
            <SearchBar resetProjectsCash={resetProjectsCash}/>
        </Container>
    </Box>
  )
}

function Categories({ resetProjectsCash }) {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                category: {
                    all: content.filter.category.all,
                    reset: content.filter.category.reset
                }
            }
        } else {
            return categoriesFirstContent;
        }
    })();

    const { isSuccess, data, refetch } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const activeCategory = useSelector((state) => state.portfolioFilter.cat);
    
    const filterAction = useDispatch();
    
    const selectCategory = (catId) => {
        if (activeCategory != catId) {
            resetProjectsCash();
            filterAction(portfolioFilterSliceActions.changeCategory({ cat: catId }));
        }         
    }
    
    const resetFilter = () => {
        if (activeCategory != "all") {
            resetProjectsCash();
            filterAction(portfolioFilterSliceActions.resetFilters());
        }
    }

    useUpdateEffect(() => {
        refetch();
    },[defaultContent.language])

    return (
        <Stack dir={defaultContent.direction} direction={"row"} className='filterCategory'>
            <Button className={ activeCategory == "all" && 'activeCategory' } onClick={ () => selectCategory("all") }>{ defaultContent.category.all }</Button>
            { isSuccess && data.map((cat) => <Button key={cat.id} className={ activeCategory == cat.id && 'activeCategory' } onClick={ () => selectCategory(cat.id) }>{ cat.title }</Button>)}
            <Button className='resetCategory' onClick={resetFilter}>
                <RotateLeftIcon/> 
                <span className='resetCategoryTitle'>{ defaultContent.category.reset }</span>
            </Button>
        </Stack>
    )
}

function SearchBar({ resetProjectsCash }) {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                search: {
                    placeholder: content.filter.search.placeholder
                }
            }
        } else {
            return searchBarFirstContent;
        }
    })();
    
    const filterAction = useDispatch();
    const searchString = useSelector((state) => state.portfolioFilter.search);

    const [searchInput, setSearchInput] = useState(searchString);
    const searchInputDeferred = useDeferredValue(searchInput);

    const searchInputChange = (e) => {
        setSearchInput(e.currentTarget.value.trim());
    }
    
    const search = (searchInputDeferred) => {
        filterAction(portfolioFilterSliceActions.search({ search: searchInputDeferred }));
    }
        
    useLayoutEffect(() => {
        search(searchInputDeferred);
        resetProjectsCash();
    }, [searchInputDeferred]);

    return (
        <Stack dir={defaultContent.direction} direction={"row"} className='filterSearch'>
            <TextField type='search' label={ defaultContent.search.placeholder } variant="outlined" value={searchString} onChange={searchInputChange}/>
            <Button variant='contained' disableRipple disableElevation></Button>
        </Stack>
    )
}

const categoriesFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    category: {
        all: "All",
        reset: "Reset filter"
    }
}

const searchBarFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    search: {
        placeholder: "Search about project"
    }
}