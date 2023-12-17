export interface InputNode {
  id: number,
  value: string,
  child: InputNode[],
}

export class InputNodeClass implements InputNode {
  id: number;
  value: string;
  child: InputNode[];

  constructor(id: number, value: string, child: InputNode[] = [] ) {
    this.id = id;
    this.value = value;
    this.child = child;
  }
}