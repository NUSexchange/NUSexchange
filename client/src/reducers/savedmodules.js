const initialState = {
    selectedModules : [],
    moduleSet : new Set(),
    selectedModulesUniversities : [],
    moduleSetUniversities : new Set()
};

const addModule = (state, module) => {
    const newSelectedModules = [...state.selectedModules, module];
    const newModuleSet = state.moduleSet.add(module.nus_module_title);
    const newSelectedModulesUniversities = [...state.selectedModulesUniversities];
    const newModuleSetUniversities = state.moduleSetUniversities;
    return {selectedModules: newSelectedModules, moduleSet: newModuleSet, selectedModulesUniversities : newSelectedModulesUniversities, moduleSetUniversities : newModuleSetUniversities};
}

const removeModule = (state, module) => {
    const newSelectedModules = [...state.selectedModules.filter(mod => mod.nus_module_title !== module.nus_module_title)];
    state.moduleSet.delete(module.nus_module_title);
    const newModuleSet = state.moduleSet;
    const newSelectedModulesUniversities = [...state.selectedModulesUniversities];
    const newModuleSetUniversities = state.moduleSetUniversities;
    return {selectedModules: newSelectedModules, moduleSet: newModuleSet, selectedModulesUniversities : newSelectedModulesUniversities, moduleSetUniversities : newModuleSetUniversities};
}

const addModuleUniversities = (state, module) => {
  const newSelectedModules = [...state.selectedModules];
  const newModuleSet = state.moduleSet.add(module.nus_module_title);
  const newSelectedModulesUniversities = [...state.selectedModulesUniversities, module];
  const newModuleSetUniversities = state.moduleSetUniversities.add(module["NUS Module"]);
  return {selectedModules: newSelectedModules, moduleSet: newModuleSet, selectedModulesUniversities : newSelectedModulesUniversities, moduleSetUniversities : newModuleSetUniversities};
}

const removeModuleUniversities = (state, module) => {
  const newSelectedModules = [...state.selectedModules];
  const newModuleSet = state.moduleSet;
  const newSelectedModulesUniversities = [...state.selectedModulesUniversities.filter(mod => mod["NUS Module"] !== module["NUS Module"])];
  state.moduleSetUniversities.delete(module["NUS Module"]);
  const newModuleSetUniversities = state.moduleSetUniversities
  return {selectedModules: newSelectedModules, moduleSet: newModuleSet, selectedModulesUniversities : newSelectedModulesUniversities, moduleSetUniversities : newModuleSetUniversities};
}

const savedModules = (state = initialState, action) => {

    switch(action.type){
      case "ADD_MODULE":
        return addModule(state, action.payload);
      case "REMOVE_MODULE":
        return removeModule(state, action.payload);
      case "ADD_MODULE_UNIVERSITY":
        return addModuleUniversities(state, action.payload);
      case "REMOVE_MODULE_UNIVERSITY":
        return removeModuleUniversities(state, action.payload);
      default:
        return state;
    }
}

export default savedModules;