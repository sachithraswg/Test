export interface InputNode {
  id: string,
  value: string,
  child: InputNode[],
}

export class InputNodeClass implements InputNode {
  id: string;
  value: string;
  child: InputNode[];

  constructor(id: string, value: string, child: InputNode[] = [] ) {
    this.id = id;
    this.value = value;
    this.child = child;
  }
}