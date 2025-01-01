from sympy import symbols, sqrt, Matrix
from sympy.physics.quantum import Ket, TensorProduct
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator, StatevectorSimulator
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt
import json
from fractions import Fraction
import math


class QuantumCircuitBuilder:
    def __init__(self, no_of_qubits, no_of_classical_bits):
        self.no_of_qubits = no_of_qubits
        self.no_of_classical_bits = no_of_classical_bits
        self.qc = QuantumCircuit(no_of_qubits, no_of_classical_bits)
        self.statevector = Statevector.from_label('0' * no_of_qubits)  # Initialize global state to |00...0⟩

    @staticmethod
    def float_to_fraction(val):
        """Convert a float to a fraction with symbolic representation if needed."""
        # If it's close to a rational number
        if abs(val - round(val)) < 1e-6:
            return str(Fraction(val).limit_denominator())
        # If it's close to 1/sqrt(2), 1/sqrt(3), etc.
        elif abs(val - math.sqrt(2)/2) < 1e-6:
            return "1/√2"
        elif abs(val - math.sqrt(3)/3) < 1e-6:
            return "1/√3"
        elif abs(val - math.sqrt(5)/5) < 1e-6:
            return "1/√5"
        else:
            approx_frac = Fraction(val).limit_denominator(1000)  # Limit the denominator for reasonable precision
            return f"{approx_frac.numerator}/{approx_frac.denominator}"

    @staticmethod
    def statevector_to_dirac(statevector, num_qubits):
        """Convert Qiskit's statevector to Dirac notation with fractions and symbolic roots."""
        components = []
        for i, amplitude in enumerate(statevector):
            if abs(amplitude) > 1e-6:  # Ignore small amplitudes for clarity
                binary_state = format(i, f'0{num_qubits}b')  # Convert index to binary string
                # Convert the amplitude to a symbolic fraction or root
                amplitude_str = QuantumCircuitBuilder.float_to_fraction(abs(amplitude))
                components.append(f"({amplitude_str})|{binary_state}⟩")
        return " + ".join(components)

    def apply_gate(self, gate, qubit, control=None):
        """Apply gates to the quantum circuit and update the statevector."""
        if gate == "H":
            self.qc.h(qubit)
        elif gate == "X":
            self.qc.x(qubit)
        elif gate == "Y":
            self.qc.y(qubit)
        elif gate == "Z":
            self.qc.z(qubit)
        elif gate == "CX" and control is not None:
            self.qc.cx(control, qubit)

        # Update the global statevector
        self.statevector = Statevector.from_instruction(self.qc)

    def build_circuit_from_json(self, json_data):
        no_of_qubits = json_data['qubits']
        no_of_classical_bits = json_data['classical_bits']
        gates = json_data['gates']  # List of dictionaries

        for i, gate_info in enumerate(gates):
            if gate_info['gate'] == 'H':
                self.apply_gate("H", gate_info['qubit'])
            elif gate_info['gate'] == 'CNOT':
                self.apply_gate("CX", gate_info['target'], control=gate_info['control'])
            elif gate_info['gate'] == 'X':
                self.apply_gate("X", gate_info['qubit'])
            elif gate_info['gate'] == 'Y':
                self.apply_gate("Y", gate_info['qubit'])
            elif gate_info['gate'] == 'Z':
                self.apply_gate("Z", gate_info['qubit'])
            elif gate_info['gate'] == 'barrier':
                self.qc.barrier()
                
                dirac_state = self.statevector_to_dirac(self.statevector.data, no_of_qubits)
                print(f"State after barrier {i}:\n{dirac_state}")

                # Visualize probabilities
                probabilities = {format(i, f'0{no_of_qubits}b'): abs(amplitude)**2 for i, amplitude in enumerate(self.statevector.data)}
                #dictionary of binary state: probability
                
                shots = 1024
                counts = {state: int(prob * shots) for state, prob in probabilities.items()}
  
                fig = plot_histogram(counts)
   
                plt.show(block=True)

        print(self.qc.draw())  
        return self.qc


# Read JSON input and run the circuit
with open('circuit.json', 'r') as file:
    json_data = json.load(file)

circuit_builder = QuantumCircuitBuilder(json_data['qubits'], json_data['classical_bits'])
circuit_builder.build_circuit_from_json(json_data)
