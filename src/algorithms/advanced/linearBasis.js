// Linear Basis (XOR Basis) Algorithm Step Generator

export class LinearBasisModel {
  constructor(bitWidth = 6) {
    this.bitWidth = bitWidth;
    this.basis = new Array(bitWidth).fill(0);
    this.history = []; // tracks inserted numbers
  }

  reset() {
    this.basis = new Array(this.bitWidth).fill(0);
    this.history = [];
  }

  generateInsertSteps(originalValue) {
    const steps = [];
    let mask = originalValue;
    const tempBasis = [...this.basis];

    steps.push({
      type: 'START_INSERT',
      originalValue,
      mask,
      bitWidth: this.bitWidth,
      currentBit: null,
      basisState: [...tempBasis],
      description: `Inserting value ${originalValue} (binary: ${originalValue.toString(2).padStart(this.bitWidth, '0')}₂). Checking from MSB bit ${this.bitWidth - 1} down to 0.`,
      line: 9
    });

    let inserted = false;

    for (let i = this.bitWidth - 1; i >= 0; i--) {
      const bitSet = (mask & (1 << i)) !== 0;

      if (!bitSet) {
        steps.push({
          type: 'BIT_ZERO',
          originalValue,
          mask,
          currentBit: i,
          basisState: [...tempBasis],
          description: `Bit ${i} is 0 in current mask ${mask} (${mask.toString(2).padStart(this.bitWidth, '0')}₂). Continuing to next bit.`,
          line: 10
        });
        continue;
      }

      if (tempBasis[i] === 0) {
        tempBasis[i] = mask;
        inserted = true;
        steps.push({
          type: 'BASIS_INSERTED',
          originalValue,
          mask,
          currentBit: i,
          basisState: [...tempBasis],
          insertedSlot: i,
          description: `basis[${i}] is empty! Stored linearly independent basis vector ${mask} (${mask.toString(2).padStart(this.bitWidth, '0')}₂).`,
          line: 12
        });
        break;
      } else {
        const oldMask = mask;
        mask ^= tempBasis[i];
        steps.push({
          type: 'XOR_REDUCE',
          originalValue,
          oldMask,
          mask,
          currentBit: i,
          basisVal: tempBasis[i],
          basisState: [...tempBasis],
          description: `basis[${i}] already occupied by ${tempBasis[i]} (${tempBasis[i].toString(2).padStart(this.bitWidth, '0')}₂). Eliminating bit ${i}: mask = ${oldMask} ^ ${tempBasis[i]} = ${mask} (${mask.toString(2).padStart(this.bitWidth, '0')}₂).`,
          line: 15
        });
      }
    }

    if (!inserted) {
      steps.push({
        type: 'DEPENDENT',
        originalValue,
        mask: 0,
        basisState: [...tempBasis],
        description: `Mask was reduced to 0! ${originalValue} is linearly dependent on current basis vectors (can already be formed by subset XOR).`,
        line: 17
      });
    }

    this.basis = tempBasis;
    if (inserted) this.history.push(originalValue);

    return steps;
  }

  generateMaxXorSteps() {
    const steps = [];
    let maxXor = 0;

    steps.push({
      type: 'START_MAX_XOR',
      maxXor,
      currentBit: null,
      basisState: [...this.basis],
      description: `Computing Maximum XOR Subset. Initial maxXor = 0. We greedily set bits from MSB ${this.bitWidth - 1} down to 0.`,
      line: 21
    });

    for (let i = this.bitWidth - 1; i >= 0; i--) {
      const bVal = this.basis[i];
      if (bVal === 0) {
        steps.push({
          type: 'MAX_XOR_SKIP',
          currentBit: i,
          maxXor,
          basisState: [...this.basis],
          description: `basis[${i}] is 0. Cannot alter bit ${i}. Current max = ${maxXor}.`,
          line: 22
        });
        continue;
      }

      const xorCandidate = maxXor ^ bVal;
      if (xorCandidate > maxXor) {
        const oldXor = maxXor;
        maxXor = xorCandidate;
        steps.push({
          type: 'MAX_XOR_TAKE',
          currentBit: i,
          basisVal: bVal,
          oldXor,
          maxXor,
          basisState: [...this.basis],
          description: `XORing with basis[${i}] (${bVal}): ${oldXor} ^ ${bVal} = ${maxXor} > ${oldXor}. Taking basis[${i}]!`,
          line: 24
        });
      } else {
        steps.push({
          type: 'MAX_XOR_REJECT',
          currentBit: i,
          basisVal: bVal,
          maxXor,
          candidate: xorCandidate,
          basisState: [...this.basis],
          description: `XORing with basis[${i}] gives ${xorCandidate} <= ${maxXor}. Skipping basis[${i}].`,
          line: 23
        });
      }
    }

    steps.push({
      type: 'MAX_XOR_COMPLETE',
      maxXor,
      basisState: [...this.basis],
      description: `Maximum possible XOR subset sum is ${maxXor} (${maxXor.toString(2).padStart(this.bitWidth, '0')}₂)!`,
      line: 27
    });

    return steps;
  }
}
