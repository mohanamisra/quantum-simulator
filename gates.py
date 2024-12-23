from sympy import symbols, Matrix
from sympy.physics.quantum.tensorproduct import TensorProduct
from sympy.physics.quantum import Ket
from sympy.printing.latex import latex
from IPython.display import display, Math
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator, StatevectorSimulator
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt
import json

from sympy import symbols, sqrt, Matrix
from sympy.physics.quantum import TensorProduct

class QuatumCircuitBuilder:
    def __init__(self, no_of_qubits, no_of_classical_bits):
        self.no_of_qubits = no_of_qubits
        self.no_of_classical_bits = no_of_classical_bits
        self.qc = QuantumCircuit(no_of_qubits, no_of_classical_bits)
        self.state = [Ket(0) for _ in range(no_of_qubits)]
        self.ket_0=Ket(0)
        self.ket_1=Ket(1)
        
    #for formatting the mathematical formulations correctly
    def display_gate_operation(self, updated_state):
        num_qubits = len(updated_state)
    
        
        # Generate the tensor product string starting at qubit i
        tensor_product = " ⊗ ".join(
            [str(updated_state[j]) for j in range(0, num_qubits)]
            )
        print(f"{tensor_product}")

            
        



    
#Single-qubit gates
    def apply_gate(self, state, gate, qubit_index):
        updated_state = state.copy()
    
        qubit=updated_state[qubit_index]
        a=qubit.coeff(self.ket_0)
        b=qubit.coeff(self.ket_1)
      
        if gate == "H": 
            updated_state[qubit_index]=(a+b)/sqrt(2)*self.ket_0 + (a-b)/sqrt(2)*self.ket_1
        
        elif gate == "X":  
        
            updated_state[qubit_index] = a*self.ket_1 +b*self.ket_0
            
        elif gate == "Y": 
            updated_state[qubit_index] = a*symbols('I')*self.ket_1 - b*symbols('I')*self.ket_0
           
        elif gate == "Z":  
            updated_state[qubit_index] = a*self.ket_0 - b*self.ket_1
        
        elif gate=="I":
            updated_state[qubit_index]=a*self.ket_0 + b*self.ket_1
    
        else:
       
            pass
        
        return updated_state
    

    def apply_2_qubit_gate(self,state, gate, qubit_index_control, qubit_index_target):
        updated_state = state.copy()
    
        qubit_c=updated_state[qubit_index_control]
        qubit_t=updated_state[qubit_index_target]
        a=qubit_t.coeff(self.ket_0)
        b=qubit_t.coeff(self.ket_1)
        if gate=="CX":
            if qubit_c==self.ket_1:
                updated_state[qubit_index_control] = a*self.ket_1 +b*self.ket_0
            elif qubit_c==self.ket_0:
                updated_state[qubit_index_control] = a*self.ket_0 +b*self.ket_1
        
        return updated_state
    
    
    def build_circuit_from_json(self, json_data):
        no_of_qubits=json_data['qubits']
        no_of_classical_bits=json_data['classical_bits']
        gates=json_data['gates'] #list of dictionaries
        qc=QuantumCircuit(no_of_qubits, no_of_classical_bits)
        simulator=AerSimulator()
        i = 0
        for dict in gates:
            if dict['gate']=='H':
                qc.h(dict['qubit'])
                self.state = self.apply_gate(self.state, "H", dict['qubit'])
            elif dict['gate']=='CNOT':
                qc.cx(dict['control'], dict['target'])
                self.state = self.apply_2_qubit_gate(self.state, "CX", dict['control'], dict['target'])
            elif dict['gate']=='X':
                qc.x(dict['qubit'])
                self.state = self.apply_gate(self.state, "X", dict['qubit'])
            elif dict['gate']=='Y':
                qc.y(dict['qubit'])
                self.state = self.apply_gate(self.state, "Y", dict['qubit'])
            elif dict['gate']=='Z':
                qc.z(dict['qubit'])
                self.state = self.apply_gate(self.state, "Z", dict['qubit'])
            
            elif dict['gate']=='barrier':
                qc.barrier()
                qc.measure_all()
                print(f"State_{i}: ",self.display_gate_operation(self.state))
                i+=1
                result=simulator.run(qc, shots=1024).result()
                counts=result.get_counts()
                fig=plot_histogram(counts)
                plt.show(block=True)
                qc.data = qc.data[:-no_of_qubits]
                
        
            else:
                pass
        print(qc.draw())
        return qc




with open('circuit.json', 'r') as file:
    json_data=json.load(file)
s=QuatumCircuitBuilder(json_data['qubits'], json_data['classical_bits'])
s.build_circuit_from_json(json_data)
# Apply Hadamard (H) gate on the first qubit

