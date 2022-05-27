import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not status option`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
