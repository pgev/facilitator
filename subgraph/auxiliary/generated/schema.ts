// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class AvailableStateRoot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AvailableStateRoot entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AvailableStateRoot entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AvailableStateRoot", id.toString(), this);
  }

  static load(id: string): AvailableStateRoot | null {
    return store.get("AvailableStateRoot", id) as AvailableStateRoot | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockHeight(): BigInt {
    let value = this.get("blockHeight");
    return value.toBigInt();
  }

  set blockHeight(value: BigInt) {
    this.set("blockHeight", Value.fromBigInt(value));
  }

  get stateRoot(): Bytes {
    let value = this.get("stateRoot");
    return value.toBytes();
  }

  set stateRoot(value: Bytes) {
    this.set("stateRoot", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}
