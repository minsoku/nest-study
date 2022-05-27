import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const foundId = this.boards.find((board) => board.id === id);

    console.log(this.boards);

    if (!foundId) {
      throw new NotFoundException(`I cant find id ${id}`);
    }

    return foundId;
  }

  deleteBoard(id: string): void {
    const foundDeleteId = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== foundDeleteId.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
