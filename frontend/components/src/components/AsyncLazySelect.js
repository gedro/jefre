import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AsyncPaginate } from "react-select-async-paginate";
import { FaPlus } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';

import ConceptList from "./ConceptList";

const useStyles = makeStyles((theme) => ({
  com_async_select: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  com_select_link_icon: {
    float: "right",
    marginLeft: "1rem",
    marginRight: "0.5rem",
    fontSize: "1.4em",
  },
  com_select_description: {
    overflow: "overlay",
    width: "30%",
    height: "100%",
    alignItems: "start",
    marginLeft: "2em",
  },
  com_select_add_icon: {
    float: "right",
    marginLeft: "1rem",
    fontSize: "1.6em",
    marginTop: "0.5em",
    cursor: "pointer",
  },
  com_select_remove_button: {
    float: "left",
    marginRight: "1rem",
    fontSize: "1.1em",
    marginTop: "0.5em",
    padding: "0.5em",
    fontWeight: "bold",
    cursor: "pointer",
  },
  com_select_concept_list_container: {
    clear: "both",
    marginTop: "3.5em",
  },
  com_select_concept_list: {
    display: "flex",
    flexDirection: "column",
  },
  com_select_concept_list_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.5em",
    borderBottom: "1px solid #ccc",
  },
}));

export default function AsyncLazySelect({
  appContext, id, value, handleOnChange, listEndpoint, detailsEndpoint, withRange,
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
      if(!selectedConcept?.month) {
        selectedConcept.month = 1;
      }
      if(withRange && !selectedConcept?.maxMonth) {
        selectedConcept.maxMonth = 960;
      }
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

  const handleItemChange = (e, item, which) => {
    const updatedConcepts = selectedConcepts.map((concept) => {
      if (concept.url === item.url) {
        if(withRange && which === "max") {
          return { ...concept, maxMonth: e.target.value };
        }
        return { ...concept, month: e.target.value };
      }
      return concept;
    });
    setSelectedConcepts(updatedConcepts);
  }

  const classes = useStyles();
  return (
    <div className={classes.com_async_select}>
      <div style={{ width: "65%" }}>
        <div>
          <AsyncPaginate
            id={id} value={selectedConcept} placeholder={placeholder}
            onChange={handleSelection} loadOptions={loadOptions}
            getOptionValue={(option) => option.url}
            getOptionLabel={(option) => option.title}
            isOptionDisabled={(option) => selectedConcepts.map(c => c.url).includes(option.url)}
            isSearchable={true} backspaceRemoves={true} debounceTimeout={500} cacheOptions
            additional={{
              page: 0,
            }}
          />
          <button type="button" className={classes.com_select_remove_button}
                  disabled={!selectedConcepts || selectedConcepts.length <= 0}
                  onClick={() => setSelectedConcepts([])} >
            Remove All
          </button>
          <button className={classes.com_select_add_icon} type="button"
                  disabled={!selectedConcept} onClick={addConcept}>
            <FaPlus/>
          </button>
        </div>
        <div className={classes.com_select_concept_list_container} >
          <ConceptList items={selectedConcepts} classes={classes} withRange={withRange}
                       removeItem={removeConcept} handleItemChange={handleItemChange} />
        </div>
      </div>
      {selectedConcept ?
        <div className={classes.com_select_description}>
          <a className={classes.com_select_link_icon}
             href={selectedConcept?.url} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt/>
          </a>
          {description}
        </div>
      : null}
    </div>
  );
}
