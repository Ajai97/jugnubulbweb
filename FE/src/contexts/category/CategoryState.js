import CategoryContext from "./CategoryContext";

const CategoryState=(props)=>{
    const state={
        
    };
        return(
            <CategoryContext.Provider value={state}>
                {props.children}
            </CategoryContext.Provider>

        )
}


export default CategoryState;