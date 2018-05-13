import {Folder} from './folder.name';
import {Material} from '../material/material.model';

export class FolderPage {
  id: number;
  name: string;
  parent: number;
  user: number;
  is_open: boolean;
  folders: Folder[];
  materials: Material[];
}
