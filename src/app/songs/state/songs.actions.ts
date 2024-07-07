import { SongDTO } from "../../models/song";

export class LoadSongs {
    static readonly type = '[Songs] Load Songs';
  }
  
  export class LoadSong {
    static readonly type = '[Songs] Load Song';
    constructor(public id: number) {}
  }
  
  export class CreateSong {
    static readonly type = '[Songs] Create Song';
    constructor(public payload: SongDTO) {}
  }
  
  export class UpdateSong {
    static readonly type = '[Songs] Update Song';
    constructor(public id: number, public payload: SongDTO) {}
  }
  
  export class DeleteSong {
    static readonly type = '[Songs] Delete Song';
    constructor(public id: number) {}
  }