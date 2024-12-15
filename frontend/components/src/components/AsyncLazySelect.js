import React, { Fragment, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { makeStyles } from "@material-ui/core/styles";
import { AsyncPaginate } from "react-select-async-paginate";

import ConceptList from "./ConceptList";

const useStyles = makeStyles((theme) => ({
  com_async_select: {
    color: 'rgb(51 65 85)',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    margin: '0',
    display: 'inline',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
}));

export default function AsyncLazySelect({
  appContext, id, value, handleOnChange, listEndpoint, detailsEndpoint,
  placeholder = "Select an option"
}) {
  const [description, setDescription] = useState("");
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedConcepts, setSelectedConcepts] = useState([]);

  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setSelectedConcepts(value);
    } else {
      const concepts = JSON.parse(localStorage.getItem(id + '_concepts'));
      if (concepts) {
        setSelectedConcepts(concepts);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(id + '_concepts', JSON.stringify(selectedConcepts));
    handleOnChange(selectedConcepts);
  }, [selectedConcepts]);

  useEffect(() => {
    if(selectedConcept) {
      fetchDescription(selectedConcept.url)
        .then(response => setDescription(response.data))
    } else {
      setDescription("");
    }
  }, [selectedConcept]);

  const addConcept = () => {
    if(selectedConcept) {
      setSelectedConcepts([...selectedConcepts, selectedConcept]);
      setSelectedConcept(null);
    }
  };

  const removeConcept = (conceptToBeDeleted) => {
    setSelectedConcepts(selectedConcepts.filter((concept) => conceptToBeDeleted !== concept));
  };

  const fetchConcepts = async (inputValue, page) => {
    const response = await appContext.api.get(`${listEndpoint}?query=${inputValue}&page=${page}`);
    return {
      concepts: Array.isArray(response.data?.concepts) ? response.data.concepts : [],
      hasMore: !!response.data?.hasMore,
    };
  };

  const fetchDescription = async (url) => {
    return await appContext.api.get(`${detailsEndpoint}?url=${url}`);
  };

  const loadOptions = async (inputValue, loadedOptions, { page }) => {
    const { concepts, hasMore } = await fetchConcepts(inputValue, page);

    return {
      options: concepts,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  const handleSelection = async (option) => {
    setSelectedConcept(option);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <AsyncPaginate
        id={id}
        loadOptions={loadOptions}
        value={selectedConcept}
        getOptionValue={(option) => option.url}
        getOptionLabel={(option) => option.title}
        isOptionDisabled={(option) => selectedConcepts.map(c => c.url).includes(option.url)}
        isSearchable={true}
        backspaceRemoves={true}
        placeholder={placeholder}
        debounceTimeout={500}
        cacheOptions
        additional={{
          page: 0,
        }}
        onChange={handleSelection}
      />
      <button disabled={!selectedConcept} onClick={addConcept} type="button">
        <FaPlus/>
      </button>
      <button disabled={!selectedConcepts || selectedConcepts.length <= 0} onClick={() => setSelectedConcepts([])} type="button">
        Remove All
      </button>
      <ConceptList items={selectedConcepts} removeItem={removeConcept} />
      <pre>{description}</pre>
    </Fragment>
  );
}
