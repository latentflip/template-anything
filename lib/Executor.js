var Executor = module.exports = function() {
    
}

Executor.prototype.run = function(plan, env) {
    this._runList(plan.inputs.steps, env, function(err) {
        if (err) {
            console.error(err);
            console.error(err.stack);
        } else {
            console.log('all done');
        }
    });
}

Executor.prototype._runList = function(list, env, cb) {
    function next(ix) {
        if (ix === list.length) {
            cb();
        } else {
            var call = list[ix];
            try {
                var directive = env.lookupDirective(call.name);
                directive.run(
                    directive.resolveArgs(call.positionalArgs, call.namedArgs),
                    env,
                    function(err) {
                        if (err) {
                            cb(err);
                        } else {
                            next(ix + 1);
                        }
                    }
                );
            } catch (err) {
                cb(err);
                return;
            }
        }
    }
    process.nextTick(function() { next(0); });
}