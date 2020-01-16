import React, {Component} from 'react';

class AddTodo extends Component {
    state = {
        invalidForm: true,
        formData: {
            title: '',
            details: 'Details'
        }
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddTodo(this.state.formData);
    };
    
    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
          formData,
          invalidForm: !this.formRef.current.checkValidity()
        });
      };

    render() {
        return (
            <> 
            <h1>Add Todo</h1>
            <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>Todo</label>
                    <input
                        className='form-control'
                        name='title'
                        value={this.state.formData.title}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Details</label>
                    <input
                        className='form-control'
                        name='details'
                        value={this.state.formData.details}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='btn'
                    disabled={this.state.invalidForm}
                >
                    Add Todo
                </button>
            </form>
            </>
        );
    }
}

export default AddTodo;