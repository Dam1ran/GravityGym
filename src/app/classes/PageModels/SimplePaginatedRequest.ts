import { MatSort, MatPaginator } from '@angular/material';
import { RequestFilters } from './RequestFilters';
import { FilterLogicalOperators } from './FilterLogicalOperators';

export class SimplePaginatedRequest {
    pageIndex: number;
    pageSize: number;
    columnNameForSorting: string;
    sortDirection: string;
    requestFilters: RequestFilters;

    constructor(columnNameForSorting: string,searchFilter: string) {
        this.pageIndex = 0;
        this.pageSize =  10;
        this.columnNameForSorting = columnNameForSorting;
        this.sortDirection = 'ASC';
        this.requestFilters = { logicalOperator : FilterLogicalOperators.Or, filters : [{ path: columnNameForSorting, value: searchFilter }] };
    }

}
