import { Box, Button, Container, Stack, TextField } from '@mui/material'
import React, { useDeferredValue, useEffect, useLayoutEffect, useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useGetCategoriesQuery } from '../../redux/server state/projects';
import { useDispatch, useSelector } from 'react-redux';
import { portfolioFilterSliceActions } from '../../redux/clint state/portfolio';


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
    const { isSuccess, data } = useGetCategoriesQuery(undefined, {
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

    return (
        <Stack direction={"row"} className='filterCategory'>
            <Button className={ activeCategory == "all" && 'activeCategory' } onClick={ () => selectCategory("all") }>All</Button>
            { isSuccess && data.map((cat) => <Button key={cat.id} className={ activeCategory == cat.id && 'activeCategory' } onClick={ () => selectCategory(cat.id) }>{ cat.title }</Button>)}
            <Button className='resetCategory' onClick={resetFilter}>
                <RotateLeftIcon/> 
                <span className='resetCategoryTitle'>Reset filter</span>
            </Button>
        </Stack>
    )
}

function SearchBar({ resetProjectsCash }) {
    
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
        <Stack direction={"row"} className='filterSearch'>
            <TextField type='search' label="Search about project" variant="outlined" value={searchString} onChange={searchInputChange} />
            <Button variant='contained' disableRipple disableElevation></Button>
        </Stack>
    )
}