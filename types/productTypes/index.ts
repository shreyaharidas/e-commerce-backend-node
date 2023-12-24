export type searchQueryType = {
    supplier_reg_id: string;
    $or?: Array<{ [key: string]: string | { [key: string]: RegExp } }>;
};

export type SearchQueryTypegetAllProducts={
    $or?: Array<{ [key: string]: string | { [key: string]: RegExp } }>;
}