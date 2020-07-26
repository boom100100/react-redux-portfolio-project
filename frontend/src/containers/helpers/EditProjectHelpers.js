export const addSectionTitle = () => {
  document.getElementById('add-new-section-title').style.display = 'block';

  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'none';

}

export const hideNewCreators = () => {
  document.getElementById('add-new-section-title').style.display = 'none';
  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'none';
}
export const showAddDataOptions = () => {
  document.getElementById('primary-links').style.display = 'none';
  hideNewCreators();

  document.getElementById('secondary-links').style.display = 'block';

}

export const showPrimaryOptions = () => {
  document.getElementById('primary-links').style.display = 'block';

  document.getElementById('secondary-links').style.display = 'none';
  hideNewCreators();
}

export const showResearchContainer = () => {
  hideNewCreators();
  document.getElementById('add-new-research').style.display = 'block';
}

export const addResearchData = () => {
  showResearchContainer();
  document.getElementById('add-new-research-data').style.display = 'block';

  document.getElementById('add-new-random-data').style.display = 'none';
  document.getElementById('add-new-preliminary-data').style.display = 'none';

}
export const addPreliminaryData = () => {
  showResearchContainer();
  document.getElementById('add-new-preliminary-data').style.display = 'block';

  document.getElementById('add-new-random-data').style.display = 'none';
  document.getElementById('add-new-research-data').style.display = 'none';

}
export const addRandomData = () => {
  showResearchContainer();
  document.getElementById('add-new-random-data').style.display = 'block';

  document.getElementById('add-new-preliminary-data').style.display = 'none';
  document.getElementById('add-new-research-data').style.display = 'none';

}
export const addGraph = () => {
  document.getElementById('add-new-section-title').style.display = 'none';
  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'block';

}
