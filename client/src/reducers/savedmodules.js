const initialState = {
    selectedModules : [],
    moduleSet : new Set()
};

const addModule = (state, module) => {
    const newSelectedModules = [...state.selectedModules, module];
    const newModuleSet = state.moduleSet.add(module.nus_module_title);
    return {selectedModules: newSelectedModules, moduleSet: newModuleSet};
}

const removeModule = (state, module) => {
    const newSelectedModules = [...state.selectedModules.filter(mod => mod.nus_module_title !== module.nus_module_title)];
    state.moduleSet.delete(module.nus_module_title);
    const newModuleSet = state.moduleSet;
    return {selectedModules: newSelectedModules, moduleSet: newModuleSet};
}

const savedModules = (state = initialState, action) => {

    switch(action.type){
      case "ADD_MODULE":
        return addModule(state, action.payload);
      case "REMOVE_MODULE":
        return removeModule(state, action.payload);
      default:
        return state;
    }
}

export default savedModules;