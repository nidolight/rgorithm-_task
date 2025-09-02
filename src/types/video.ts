export interface Item {
id: number;
title: string;
category: string;
length: string; // e.g., "12:34"
thumb: string; // image url
uid: string;
link: string; // video url
view: number; // views
isDeleted: number;
created_by: number;
created_at: string;
updated_at: string;
}