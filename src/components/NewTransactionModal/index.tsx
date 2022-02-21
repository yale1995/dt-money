import Modal from 'react-modal';
import {Container,TransactionTypeContainer,RadioBox } from './styles'
import closeIMG from '../../asset/close.svg'
import incomeIMG from '../../asset/income.svg'
import outcomeIMG from '../../asset/outcome.svg'
import {useState,FormEvent,useContext} from 'react'
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps{
    isOpen: boolean,
    onRequestClose: () => void,


}
export const NewTransactionModal = ({isOpen,onRequestClose}:NewTransactionModalProps) =>{
    const {createTransaction} = useTransactions();

    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    const [category,setCategory] = useState('')
    const [type,setType] = useState('deposit')

    async function handleCreateNewTransaction (event:FormEvent){

        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');

        onRequestClose();

    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
        >
            <button
            type='button'
            onClick={onRequestClose}
            className='react-modal-close'>
                <img src={closeIMG} alt='Fechar modal'></img>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
            <input
            placeholder="Título"
            value= {title}
            onChange = {event => setTitle(event.target.value) }
            />

            <input
            type="number"
            placeholder="Valor"
            value= {amount}
            onChange = {event => setAmount(Number(event.target.value)) }
            />

            <TransactionTypeContainer>

                <RadioBox 
                type='button'
                onClick={()=>{setType('deposit')}}
                isActive={type ==='deposit'}
                activeColor = 'green'

                >
                    <img src={incomeIMG} alt="Entradas" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox
                type='button'
                onClick={()=>{setType('withdraw')}}
                isActive={type ==='withdraw'}
                activeColor = 'red'
                >
                    <img src={outcomeIMG} alt="Saída" />
                    <span>Saídas</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input
            placeholder="Categoria"
            value= {category}
            onChange = {event => setCategory(event.target.value) }
            />

            <button type="submit">
                Cadastrar</button>

            </Container> 
            

        </Modal>
    );
}