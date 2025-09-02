import type { Item } from "./video";


export interface ApiResponse {
data: Item[];
current_page: number;
last_page: number;
}