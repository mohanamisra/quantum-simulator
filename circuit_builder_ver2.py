
from sympy import latex, symbols
from sympy.physics.quantum import Ket, TensorProduct
from qiskit import QuantumCircuit
import qiskit.quantum_info as qi
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_histogram, array_to_latex
import matplotlib.pyplot as plt
import json



class QuantumCircuitBuilder:
    def __init__(self, no_of_qubits, no_of_classical_bits):
        self.no_of_qubits = no_of_qubits
        self.no_of_classical_bits = no_of_classical_bits
        self.qc = QuantumCircuit(no_of_qubits, no_of_classical_bits)
        self.statevector = Statevector.from_label('0' * no_of_qubits)  # Initialize global state to |00...0⟩
        
    def display_dirac_state(self,statevector):
        state_dict = statevector.to_dict()

    # Convert to LaTeX-style Dirac notation
        dirac_terms = [f"{latex(v)} \\ket{{{k}}}" for k, v in state_dict.items()]
        dirac_notation = " + ".join(dirac_terms)

        print(f"${dirac_notation}$")
        
    
        



    def build_circuit_from_json(self, json_data):
        no_of_qubits = json_data['qubits']
        no_of_classical_bits = json_data['classical_bits']
        gates = json_data['gates']  # List of dictionaries

        for i, gate_info in enumerate(gates):
            if gate_info['gate'] == 'H':
                self.qc.h(gate_info['qubit'])
            elif gate_info['gate'] == 'CNOT':
                self.qc.cx(gate_info['control'],gate_info['target'])
            elif gate_info['gate'] == 'X':
                self.qc.x(gate_info['qubit'])
            elif gate_info['gate'] == 'Y':
                self.qc.y(gate_info['qubit'])
            elif gate_info['gate'] == 'Z':
                self.qc.z(gate_info['qubit'])
            elif gate_info['gate'] == 'barrier':
                self.qc.barrier()
                
                self.statevector = qi.Statevector(self.qc)
                self.statevector.draw('latex')
                self.display_dirac_state(self.statevector)

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
with open('/Users/seema/Desktop/Quantum_simulator/circuit.json', 'r') as file:
    json_data = json.load(file)

circuit_builder = QuantumCircuitBuilder(json_data['qubits'], json_data['classical_bits'])
circuit_builder.build_circuit_from_json(json_data)
